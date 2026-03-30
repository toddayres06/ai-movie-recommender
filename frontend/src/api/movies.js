import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_KEY

export async function searchMovies(query) {
  const res = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: API_KEY,
        query
      }
    }
  )
  return res.data.results
}

export async function getMovieDetails(id) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      params: {
        api_key: API_KEY
      }
    }
  )
  return res.data
}