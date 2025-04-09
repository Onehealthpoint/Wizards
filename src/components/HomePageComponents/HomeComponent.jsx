import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import { FetchAllBooks } from "../Firebase/BookCRUD"
import { AddToCart } from "../Firebase/CartCRUD"
import { useAuth } from "../Firebase/Auth"
import { HeartIcon, ShoppingCartIcon } from "lucide-react"
import { AddToWishlist } from "../Firebase/WishlistCRUD"
import heartAnimation from "../Animation/Wish.json"
import checkAnimation from "../Animation/Check.json"
import BookDetailsModal from "./BookDetailModel"
import { Link, useNavigate } from "react-router-dom"
import loaderAnimation from "../Animation/Loading.json" // Import loader animation

const HomeComponent = () => {
  const navigate = useNavigate()

  const { User, UID } = useAuth()
  const [books, setBooks] = useState([])
  const [wishlistClicked, setWishlistClicked] = useState({})
  const [cartClicked, setCartClicked] = useState({})
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true) // Set loading to true before fetching
      const booksData = await FetchAllBooks()
      booksData.sort(() => Math.random() - 0.5) // Shuffle the books
      setBooks(booksData)
      setLoading(false) // Set loading to false after fetching
    }
    fetchBooks()
  }, [])

  const moveToWishlist = async (ISBN) => {
    await AddToWishlist(UID, ISBN)
    setWishlistClicked((prevState) => ({ ...prevState, [ISBN]: true }))
  }

  const addToCart = async (ISBN, qty) => {
    await AddToCart(UID, ISBN, qty)
    setCartClicked((prevState) => ({ ...prevState, [ISBN]: true }))
  }

  const showBookDetails = (book) => {
    setSelectedBook(book)
  }

  const closeBookDetails = () => {
    setSelectedBook(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Books</h2>
        <div className="flex justify-center">
          {loading ? ( // Show loader if loading is true
            <Lottie animationData={loaderAnimation} loop autoplay style={{ width: 200, height: 200 }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {books.slice(0, 20).map((book, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer"
                  onClick={() => showBookDetails(book)}
                >
                  <img
                    src={book.imageUrl || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-48 object-contain mt-4"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{book.title}</h3>
                    <Link to={`/author/${book.author}`} className="text-sm text-gray-500 mb-2 hover:text-blue-500">
                      By {book.author}
                    </Link>
                    <p className="text-sm text-gray-700 mb-2 flex-grow">{book.summary}</p>
                    <p className="text-lg font-bold text-blue-500 mb-2">Rs.{book.price}</p>
                    <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        onClick={async() => {
                          if(!UID){
                            navigate("/login");
                          }else{
                            await moveToWishlist(book.ISBN);
                          }
                        }}
                      >
                        {wishlistClicked[book.ISBN] ? (
                          <Lottie
                            animationData={heartAnimation}
                            loop={false}
                            autoplay
                            style={{ width: 16, height: 16 }}
                          />
                        ) : (
                          <HeartIcon className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        onClick={async() => {
                          if(!UID){
                            navigate("/login");
                          }else{
                            await addToCart(book.ISBN, 1);
                          }
                        }}
                      >
                        {cartClicked[book.ISBN] ? (
                          <Lottie
                            animationData={checkAnimation}
                            loop={false}
                            autoplay
                            style={{ width: 16, height: 16 }}
                          />
                        ) : (
                          <ShoppingCartIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Render the modal if a book is selected */}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          UID={UID}
          username={User?.displayName}
          wishlistClicked={wishlistClicked}
          cartClicked={cartClicked}
          onClose={closeBookDetails}
          onAddToWishlist={moveToWishlist}
          onAddToCart={addToCart}
        />
      )}
    </div>
  )
}

export default HomeComponent