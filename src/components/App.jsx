import { Route, Routes } from "react-router-dom";
import { lazy, useState } from "react";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Navigation from "./Navigation/Navigation";
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
      <Routes>
        <Route
          path="/"
          element={
            <Navigation
              onChange={() => {
                setTag(!tag);
              }}
              options={tag}
            />
          }>
          <Route index element={<HomePage options={tag} />} />
          <Route path="movies" element={<MoviesPage options={tag} />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
