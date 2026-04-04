import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieDetails } from "../api/movies"
import { getRecommendations } from "../api/recommend"
import notAvailable from "../assets/notAvailable.jpg"

function MovieDetails(){

  const [recommendations, setRecommendations] = useState([])
  const [loadingAI, setLoadingAI] = useState(false)

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  async function handleRecommend() {
    try {
      setLoadingAI(true)

      const data = await getRecommendations(movie.title)

      // Convert string → array
      const parsed = data
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "")

      setRecommendations(parsed)

    } catch (err) {
      console.error(err)
    } finally {
      setLoadingAI(false)
    }
  }

  useEffect(() => {
    async function fetchMovie(){
      const data = await getMovieDetails(id)
      setMovie(data)
    }

    fetchMovie()
  }, [id])

  if (!movie) return <p className="p-10">Loading...</p>

  return (
    <div className="p-10 bg-black text-white min-h-screen">

      <h1 className="text-3xl font-bold">{movie.title}</h1>

      <img
        className="mt-6"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : notAvailable
        }
      />

      <p className="mt-4">{movie.overview}</p>

      <button
        onClick={handleRecommend}
        disabled={loadingAI}
        className="mt-6 bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
      >
        {loadingAI ? "Generating..." : "Get AI Recommendations"}
      </button>

      {loadingAI && (
        <p className="mt-4">Generating recommendations...</p>
      )}

      {/* ✅ NEW ARRAY-BASED UI */}
      {recommendations.length > 0 && (
        <div className="mt-6 space-y-3">

          <h2 className="text-xl font-semibold">
            AI Recommendations
          </h2>

          {recommendations.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded"
            >
              {item}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default MovieDetails