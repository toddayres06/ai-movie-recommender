import { useState} from "react"

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a movie..."
                className="px-4 py-2 rounded text-black"
            />

            <button className="bg-blue-600 px-4 py-2 rounded">
                Search
            </button>
        </form>
    )
}

export default SearchBar