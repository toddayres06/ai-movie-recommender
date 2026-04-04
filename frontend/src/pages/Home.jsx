import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { searchMovies } from "../api/movies"
import notAvailable from "../assets/notAvailable.jpg"

function Home(){

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [query, setQuery] = useState("")

  const [searchParams] = useSearchParams()

  const location = useLocation()

  useEffect(() => {
    if (location.state?.movies) {
      setMovies(location.state.movies)
      setQuery(location.state.query)
      setHasSearched(true)
    }
  }, [])

  useEffect(() => {
    const q = searchParams.get("q")

    if (q && !hasSearched) {
      handleSearch(q)
    }
  }, [])

  async function handleSearch(searchQuery){
    try {
      setIsLoading(true)
      setHasSearched(true)
      setQuery(searchQuery)

      const results = await searchMovies(searchQuery)
      setMovies(results)

    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="p-4 sm:p-6 md:p-10 bg-black text-white min-h-screen">

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
        {!isLoading && movies.map(movie =>(
          
          <Link
            to={`/movie/${movie.id}`}
            state={{ movies, query }}
            key={movie.id}
          >
            <div className="cursor-pointer hover:scale-105 transition">

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : notAvailable
                }
                className="w-full h-auto rounded"
              />

              <p className="mt-2 text-sm sm:text-base">{movie.title}</p>

            </div>
          </Link>

        ))}

      </div>

    </div>
  )
}

export default Home