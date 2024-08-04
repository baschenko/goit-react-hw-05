import { useEffect, useState } from "react";
import * as API from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = ({ options }) => {
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
      {movies !== null && (
        <ul className={options ? styles.castList : ""}>
          <MovieList hits={movies} options={options} />
        </ul>
      )}
    </div>
  );
};

export default HomePage;
