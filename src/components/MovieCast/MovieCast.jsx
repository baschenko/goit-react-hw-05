import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../../services/api";
import s from "./MovieCast.module.css";
import imagesDefault from "../../default.png";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState();

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const actors = await API.getActorsMovie(movieId); //запит на сервер АРІ
        setActors(actors);
      } catch (error) {
        console.log(error);
      }
    }

    //HTTP запит на монтування
    getMovieInfo();
  }, [movieId]);

  return (
    <>
      {actors && (
        <>
          <ul className={s.castList}>
            {actors.cast.map((actor) => (
              <li key={actor.id} className={s.item}>
                <img
                  src={
                    actor.profile_path !== null
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : imagesDefault
                  }
                  alt={actor.name}
                  height="280"
                  className={s.img}
                />
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MovieCast;
