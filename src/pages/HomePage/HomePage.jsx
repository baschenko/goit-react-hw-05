import { useEffect, useState } from "react";
import * as API from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = ({ onChange, options }) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        const movies = await API.getMovies(); //запит на сервер АРІ
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }
    //HTTP запит на монтування
    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
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
      {movies !== null && (
        <ul className={options ? s.imageStyle : s.listStyle}>
          <MovieList hits={movies} options={options} />
        </ul>
      )}
    </div>
  );
};

export default HomePage;
