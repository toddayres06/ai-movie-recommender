import axios from "axios"

export async function getRecommendations(movie) {
  try {
    const res = await axios.post(
      "https://ai-movie-recommender-qew1.onrender.com/recommend",
      { movie }
    )
    return res.data.result
  } catch (err) {
    console.error("API error:", err)
    return "Something went wrong. Try again."
  }
}