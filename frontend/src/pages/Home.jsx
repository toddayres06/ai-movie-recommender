import { useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { searchMovies } from "../api/movies"
import notAvailable from "../assets/notAvailable.jpg"

function Home(){

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch(query){
    try {
      setIsLoading(true)
      setHasSearched(true)

      const results = await searchMovies(query)
      setMovies(results)

    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="p-10 bg-black text-white min-h-screen">

      <SearchBar onSearch={handleSearch}/>

      {/* Loading State */}
      {isLoading && (
        <p className="mt-6">Loading...</p>
      )}

      {/* Empty State */}
      {!isLoading && hasSearched && movies.length === 0 && (
        <p className="mt-6">No results found</p>
      )}

      {/* Results */}
      <div className="grid grid-cols-4 gap-6 mt-10">

        {!isLoading && movies.map(movie =>(
          
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="cursor-pointer hover:scale-105 transition">

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : notAvailable
                }
              />

              <p className="mt-2">{movie.title}</p>

            </div>
          </Link>

        ))}

      </div>

    </div>
  )
}

export default Home