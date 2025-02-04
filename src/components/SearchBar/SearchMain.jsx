import { useState, useRef, useEffect } from "react"
import { SearchBooksByTitlev2 } from "../Firebase/SearchBooks"

export const SearchMain = () => {
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef(null)

  const fetchData = async (value) => {
    if (value.length < 2) {
      setResults([])
      return
    }
    setIsLoading(true)
    try {
      const books = await SearchBooksByTitlev2(value)
      setResults(books)
    } catch (e) {
      console.error("Error fetching books: ", e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside]) // Added handleClickOutside to dependencies

  // New function to handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    fetchData(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a book"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {isLoading ? (
            <div className="p-2 text-sm text-gray-500">Loading...</div>
          ) : Array.isArray(results) && results.length > 0 ? (
            results.map((book, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(book.title)}
              >
                {book.title}
              </div>
            ))
          ) : input.length >= 2 ? (
            <div className="p-2 text-sm text-gray-500">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

