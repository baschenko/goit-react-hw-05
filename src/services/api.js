import axios from "axios";

const options = {
  method: "GET",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWQ5OTNmM2EyZjlkOThhZTUyNjY1YzU3MTFmNGFiZSIsInN1YiI6IjY2MmFkODRmNWMwNzFiMDExZjVlMzc1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rLVAAmb9wgXoqcUutJsdF_E9TvT3e0pPXYBi2Q9FDY4",
  },
};

export const getMovies = async () => {
  const { data } = await axios.request(
    "https://api.themoviedb.org/3/trending/movie/day",
    options,
  );

  return data.results;
};

export const getMovieInfo = async (movieId) => {
  const { data } = await axios.request(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options,
  );

  return data;
};

export const getActorsMovie = async (movieId) => {
  const { data } = await axios.request(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    options,
  );

  return data;
};

export const getReviewMovie = async (movieId) => {
  const { data } = await axios.request(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    options,
  );

  return data;
};

export const getSearchMovie = async (searchParam) => {
  const { data } = await axios.request(
    `https://api.themoviedb.org/3/search/movie?${searchParam}`,
    options,
  );

  return data.results;
};
