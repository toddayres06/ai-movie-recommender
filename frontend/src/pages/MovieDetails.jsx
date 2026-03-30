import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieDetails } from "../api/movies"
import notAvailable from "../assets/notAvailable.jpg"

function MovieDetails(){

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

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

    </div>
  )
}

export default MovieDetails