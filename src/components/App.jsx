import { useEffect } from "react";
import { fetchSearchMovies } from "../services/api";
import { Route, Routes } from "react-router-dom";

const App = () => {
  useEffect(() => {
    const trendMovie = async () => {
      const query = "cat";
      try {
        const data = await fetchSearchMovies({ query: query });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    trendMovie();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/movies" element={<h1>MoviesPage</h1>} />
        <Route path="/movies/:movieId" element={<h1>MovieDetailsPage</h1>}>
          <Route path="cast" element={<h1>MovieCast</h1>} />
          <Route path="reviews" element={<h1>MovieReviews</h1>} />
        </Route>
        <Route path="*" element={<h1>NotFoundPage</h1>} />
      </Routes>
    </div>
  );
};

export default App;
