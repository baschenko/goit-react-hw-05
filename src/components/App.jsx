import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Navigation from "./Navigation/Navigation";
import { InfinitySpin } from "react-loader-spinner";
import s from "./App.module.css";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage"),
);
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews"),
);

const App = () => {
  const [tag, setTag] = useState(false);
  return (
    <div className={s.container}>
      <Suspense
        fallback={
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        }>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route
              index
              element={
                <HomePage
                  options={tag}
                  onChange={() => {
                    setTag(!tag);
                  }}
                />
              }
            />
            <Route
              path="movies"
              element={
                <MoviesPage
                  options={tag}
                  onChange={() => {
                    setTag(!tag);
                  }}
                />
              }
            />
            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
