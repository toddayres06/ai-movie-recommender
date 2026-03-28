import { useState } from "react"
import SearchBar from "../components/SearchBar"
import { searchMovies } from "../api/movies"

export default function Home(){

  const [movies,setMovies] = useState([])

  async function handleSearch(query){
    const results = await searchMovies(query)
    setMovies(results)
  }

  return(
    <div className="p-10">

      <SearchBar onSearch={handleSearch}/>

      <div className="grid grid-cols-4 gap-6 mt-10">

        {movies.map(movie =>(
          <div key={movie.id}>

            <img
             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />

            <p className="mt-2">{movie.title}</p>

          </div>
        ))}

      </div>

    </div>
  )
}