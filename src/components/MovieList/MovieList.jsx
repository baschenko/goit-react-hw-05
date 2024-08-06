import { Link, useLocation } from "react-router-dom";
import imagesDefault from "../../default.png";
import s from "./MovieList.module.css";

const MovieList = ({ movies, options }) => {
  const location = useLocation();
  return movies.map((movie) =>
    options === true ? (
      <li key={movie.id} className={s.item}>
        <Link
          className={s.link}
          state={{ from: location }}
          to={`/movies/${movie.id}`}>
          <img
            src={
              movie.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : imagesDefault
            }
            alt={movie.title}
            height="280"
            className={s.img}
          />
          <h2 className={s.title}>{movie.title}</h2>
          <p className={s.text}>Rating: {Math.ceil(movie.vote_average)}</p>
        </Link>
      </li>
    ) : (
      <li key={movie.id} className={s.itemList}>
        <Link
          className={s.linkList}
          state={{ from: location }}
          to={`/movies/${movie.id}`}>
          {movie.title}
        </Link>
      </li>
    ),
  );
};

export default MovieList;
