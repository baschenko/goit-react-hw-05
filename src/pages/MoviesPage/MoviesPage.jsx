import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as API from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = ({ options }) => {
  const [searchParam, setSearchParam] = useSearchParams("");
  const [query, setQuery] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const reviews = await API.getSearchMovie(searchParam); //запит на сервер АРІ
        setSearchMovies(reviews);
      } catch (error) {
        console.log(error);
      }
    }

    //HTTP запит на монтування
    getMovieInfo();
  }, [searchParam]);

  const updateQueryString = (evt) => {
    const movieIdValue = evt.target.value;
    if (movieIdValue === "") {
      return setQuery("");
    }

    setQuery(movieIdValue);
  };

  const onChangeQuery = () => {
    setSearchParam({ query: query });
    setQuery("");
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className={s.container}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={s.input}
          value={query}
          onChange={updateQueryString}
        />
        <button type="submit" className={s.btn} onClick={onChangeQuery}>
          Search
        </button>
      </form>
      {searchMovies !== null && (
        <ul>
          <MovieList hits={searchMovies} options={options} />
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
