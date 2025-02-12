import { useState, useRef, useEffect } from "react"
import { SearchBooksByTitlev2 } from "../Firebase/SearchBooks"
import BookDetailModel from "../HomePageComponents/BookDetailModel" // Import the modal
import Lottie from "lottie-react"
import SearchIcon from "../Animation/Search.json"
import { AddToCart } from "../Firebase/CartCRUD"
import { AddToWishlist } from "../Firebase/WishlistCRUD"
import { useAuth } from "../Firebase/Auth"
import heartAnimation from "../Animation/Wish.json"
import checkAnimation from "../Animation/Check.json"

export const SearchMain = ({ username, wishlistClicked, cartClicked, onAddToWishlist, onAddToCart }) => {
  const { User,UID } = useAuth()
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null) // Track the selected book for the modal
  const [wishlistClickedState, setWishlistClickedState] = useState({})
  const [cartClickedState, setCartClickedState] = useState({})
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
  }, [])

  // Handle clicking on a suggestion
  const handleSuggestionClick = (book) => {
    setSelectedBook(book) // Set the selected book to show details
    setInput(book.title) // Update the input with the selected book's title
    setShowSuggestions(false) // Hide the suggestions dropdown
  }

  // Close the modal
  const closeBookDetails = () => {
    setSelectedBook(null)
  }

  const moveToWishlist = async (ISBN) => {
    await AddToWishlist(UID, ISBN)
    setWishlistClickedState((prevState) => ({ ...prevState, [ISBN]: true }))
  }

  const addToCart = async (ISBN) => {
    await AddToCart(UID, ISBN, 1)
    setCartClickedState((prevState) => ({ ...prevState, [ISBN]: true }))
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
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
          disabled={isLoading}
        >
          <Lottie animationData={SearchIcon}
          style={{height:50, width:50}} /> {/* Corrected the usage of SearchIcon */}
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
                onClick={() => handleSuggestionClick(book)} // Pass the entire book object
              >
                {book.title}
              </div>
            ))
          ) : input.length >= 2 ? (
            <div className="p-2 text-sm text-gray-500">No results found</div>
          ) : null}
        </div>
      )}

      {/* Render the modal if a book is selected */}
      {selectedBook && (
        <BookDetailModel
          book={selectedBook}
          UID={UID}
          username={User.displayName}
          wishlistClicked={wishlistClickedState}
          cartClicked={cartClickedState}
          onClose={closeBookDetails}
          onAddToWishlist={moveToWishlist}
          onAddToCart={addToCart}
        />
      )}
    </div>
  )
}