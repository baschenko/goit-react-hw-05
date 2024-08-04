import { Link, useLocation } from "react-router-dom";
import imagesDefault from "../../default.png";
import s from "./MoviesItem.module.css";

const MovieList = ({ hits, options }) => {
  const location = useLocation();
  return hits.map((hit) =>
    options === true ? (
      <li key={hit.id} className={s.item}>
        <Link
          className={s.link}
          state={{ from: location }}
          to={`/movies/${hit.id}`}>
          <img
            src={
              hit.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500${hit.poster_path}`
                : imagesDefault
            }
            alt={hit.title}
            height="280"
            className={s.img}
          />
          <h2 className={s.title}>{hit.title}</h2>
          <p className={s.text}>Rating: {Math.ceil(hit.vote_average)}</p>
        </Link>
      </li>
    ) : (
      <li key={hit.id}>
        <Link state={{ from: location }} to={`/movies/${hit.id}`}>
          {hit.title}
        </Link>
      </li>
    ),
  );
};

export default MovieList;
