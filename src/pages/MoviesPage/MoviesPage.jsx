import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as API from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = ({ options, onChange }) => {
  const [searchParam, setSearchParam] = useSearchParams("");
  const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const getQuery = searchParam.get("query");

  useEffect(() => {
    if (!getQuery) {
      return;
    }
    async function getMovieInfo() {
      try {
        const reviews = await API.getSearchMovie(getQuery); //запит на сервер АРІ
        setSearchMovies(reviews);
      } catch (error) {
        console.log(error);
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
    if (!query) {
      setSearchMovies([]);
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
      {searchMovies.length !== 0 && (
        <ul>
          <MovieList hits={searchMovies} options={options} />
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
