import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import * as API from "../../services/api";
import { InfinitySpin } from "react-loader-spinner";
import s from "./MovieDetailsPage.module.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const MovieDetailsPage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const [isError, setIsError] = useState(null);
  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const movie = await API.getMovieInfo(movieId); //запит на сервер АРІ
        setMovie(movie);
      } catch (error) {
        console.log(error);
        setIsError(error); //зберігаємо error у стейт
      }
    }

    //HTTP запит на монтування
    getMovieInfo();
  }, [movieId]);

  return (
    <div className={s.container}>
      <Link to={backLinkLocationRef.current}>
        <button type="button" className={s.btn}>
          👈 Go Back
        </button>
      </Link>
      {isError && <NotFoundPage>{isError.message}</NotFoundPage>}
      {movie && (
        <>
          <div className={s.header}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.tagline}
              width="280"
              className={s.image}
            />
            <div>
              <h1>{movie.original_title}</h1>
              <p>User Score: {Math.ceil(movie.vote_average * 10)} %</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p>{movie.genres.map((genre) => `${genre.name} `)}</p>
            </div>
          </div>
          <p>Additional information</p>
          <ul className={s.block}>
            <li className={s.itemList}>
              <Link to="cast" className={s.linkList}>
                Cast
              </Link>
            </li>
            <li className={s.itemList}>
              <Link to="reviews" className={s.linkList}>
                Reviews
              </Link>
            </li>
          </ul>
        </>
      )}
      <Suspense
        fallback={
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        }>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
