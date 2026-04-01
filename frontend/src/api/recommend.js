import axios from "axios"

export async function getRecommendations(movie) {
  const res = await axios.post(
    "http://localhost:5000/recommend",
    { movie }
  )
  return res.data.result
}