import axios from "axios";

// const API_KEY =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWQ5OTNmM2EyZjlkOThhZTUyNjY1YzU3MTFmNGFiZSIsIm5iZiI6MTcyMjM0MDMzMy4xNTIzOTgsInN1YiI6IjY2MmFkODRmNWMwNzFiMDExZjVlMzc1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RmxA4KZPeQH8VQ7MfiG3wvl_-j2JQnlkNZ7PthYd-M4";
// axios.defaults.baseURL = "https://api.themoviedb.org/3/";
// axios.defaults.headers.common["Authorization"] = API_KEY;
// axios.defaults.params = {
//   language: "en-US",
// };

// export const fetchTrendingMovies = async () => {
//   const { data } = await axios.get(`trending/movie/day`);
//   return data;
// };

// export const fetchSearchMovies = async ({ query }) => {
//   const { data } = await axios.get(`search/movie?query=${query}`);
//   return data;
// };

const url =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWQ5OTNmM2EyZjlkOThhZTUyNjY1YzU3MTFmNGFiZSIsIm5iZiI6MTcyMjM0MDMzMy4xNTIzOTgsInN1YiI6IjY2MmFkODRmNWMwNzFiMDExZjVlMzc1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RmxA4KZPeQH8VQ7MfiG3wvl_-j2JQnlkNZ7PthYd-M4",
  },
};

axios
  .get(url, options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
