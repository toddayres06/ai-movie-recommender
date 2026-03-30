import { useParams } from "react-router-dom"

function MovieDetails() {
    const { id } = useParams()

    return (
        <div className="p-10 text-white">
            <h1>Movie Details Page</h1>
            <p>Movie ID: {id}</p>
        </div>
    )
}

export default MovieDetails