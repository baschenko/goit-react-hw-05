import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as API from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const MoviesPage = ({ options, onChange }) => {
  const [searchParam, setSearchParam] = useSearchParams("");
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState(null);
  const [searchMovies, setSearchMovies] = useState([]);
  const getQuery = searchParam.get("query");

  useEffect(() => {
    if (!getQuery) {
      return;
    }
    async function getMovieInfo() {
      try {
        const reviews = await API.getSearchMovie(getQuery); //запит на сервер АРІ
        if (!reviews.length) {
          throw new Error(`Oops! "${getQuery}" - нема таких світлин`); //создаємо error, якщо повернувся пустий об'єкт
        }
        setSearchMovies(reviews);
      } catch (error) {
        console.log(error);
        setIsError(error);
      }
    }

    //HTTP запит на монтування
    getMovieInfo();
  }, [getQuery]);

  const updateQueryString = (evt) => {
    const movieIdValue = evt.target.value;
    setQuery(movieIdValue);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    setIsError(null);
    setSearchMovies([]);

    if (!query) {
      return setSearchParam({});
    }
    setSearchParam({ query: query });
    setQuery("");
  };

  return (
    <div>
      <h1>Search for movies</h1>
      <label className={s.label}>
        List
        <input
          type="checkbox"
          className={[s.checkbox, options ? s.on : s.off].join(" ")}
          value="false"
          onChange={() => onChange()}
        />
        Images
      </label>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={s.input}
          value={query}
          onChange={updateQueryString}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
      {isError && <NotFoundPage>{isError.message}</NotFoundPage>}
      {searchMovies.length !== 0 && (
        <ul>
          <MovieList movies={searchMovies} options={options} />
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
