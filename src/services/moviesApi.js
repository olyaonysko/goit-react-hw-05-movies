import axios from 'axios';

const apiKey = '37d52a433852bd404fa2b2ce84bfc184';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = { api_key: apiKey };

const fetchTrendingMovies = async (page = 1) => {
  const { data } = await axios.get(`/trending/all/day?page=${page}`);
  return data;
};

const fetchMovies = async (query, page = 1) => {
  const { data } = await axios.get(
    `/search/movie?language=en-US&page=${page}&include_adult=false&query=${query}`,
  );
  return data;
};

const fetchMovieDetail = async movieID => {
  try {
    const response = await axios.get(`/movie/${movieID}`);
    if (response.status === 200) {
      console.log('result', response.status);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const fetchMovieCredits = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data;
};

const fetchMovieReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data;
};

export {
  fetchTrendingMovies,
  fetchMovies,
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieReviews,
};
