import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieDetails } from "../api/movies"
import { getRecommendations } from "../api/recommend"
import notAvailable from "../assets/notAvailable.jpg"

function MovieDetails(){

  const [recommendations, setRecommendations] = useState("")
  const [loadingAI, setLoadingAI] = useState(false)

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  async function handleRecommend() {
    try {
      setLoadingAI(true)
      const data = await getRecommendations(movie.title)
      setRecommendations(data)
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
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold">{movie.title}</h1>

      <img
        className="mt-6"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : notAvailable
        }
      />

      <p className="mt-4">{movie.overview}</p>

      <button
        onClick={handleRecommend}
        className="mt-6 bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
      >
        Get AI Recommendations
      </button>

      {loadingAI && <p className="mt-4">Generating recommendations...</p>}

      {recommendations && (
        <p className="mt-4 whitespace-pre-wrap text-black">
          {recommendations}
        </p>
      )}

    </div>
  )
}

export default MovieDetails