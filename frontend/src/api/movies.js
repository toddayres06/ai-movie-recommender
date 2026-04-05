import axios from "axios"

// 🔁 Replace with your actual Render backend URL
const BASE_URL = "https://ai-movie-recommender-qew1.onrender.com"

export async function searchMovies(query) {
  const res = await axios.get(`${BASE_URL}/search`, {
    params: { query }
  })

  return res.data
}

export async function getMovieDetails(id) {
  const res = await axios.get(`${BASE_URL}/movie/${id}`)
  return res.data
}