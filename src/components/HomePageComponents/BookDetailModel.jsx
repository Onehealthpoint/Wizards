import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import { Heart, ShoppingCart, X, ChevronUp, ChevronDown, Star, Minus, Plus } from "lucide-react"
import heartAnimation from "../Animation/Wish.json"
import checkAnimation from "../Animation/Check.json"
import submitAnimation from "../Animation/submit.json"
import { RemoveReview, AddReview, FetchReviews } from "../Firebase/ReviewCRUD"

const BookDetailsModal = ({
  book,
  UID,
  username,
  wishlistClicked = {}, // Default to an empty object
  cartClicked = {}, // Default to an empty object
  onClose,
  onAddToWishlist,
  onAddToCart,
}) => {
  const navigate = useNavigate()

  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitAnimation, setShowSubmitAnimation] = useState(false)
  const [showAddReview, setShowAddReview] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (newQuantity) => {
    const qty = Math.max(1, Math.min(10, newQuantity))
    setQuantity(qty)
  }

  useEffect(() => {
    if (book) {
      const fetchReviews = async () => {
        const reviewsData = await FetchReviews(book.ISBN)
        //place user review at the top
        const userReview = reviewsData.find((review) => review.UID === UID)
        if (userReview) {
          reviewsData.splice(reviewsData.indexOf(userReview), 1)
          reviewsData.unshift(userReview)
        }
        setReviews(reviewsData)
      }
      fetchReviews()
    }
  }, [book, UID])

  // Don't render the modal if no book is selected
  if (!book) {
    return null
  }

  const handleAddReview = async () => {
    if (!UID) {
      return
    }
    if (newReview.trim() && newRating > 0) {
      setIsSubmitting(true)
      setShowSubmitAnimation(true)
      await AddReview(UID, username, book.ISBN, newReview, newRating)
      const updatedReviews = await FetchReviews(book.ISBN)
      setReviews(updatedReviews)
      setNewReview("")
      setNewRating(0)
      setTimeout(() => {
        setIsSubmitting(false)
        setShowSubmitAnimation(false)
      }, 2000) // Hide animation after 2 seconds
    }
    setShowAddReview(false)
  }

  const handleRemoveReview = async () => {
    await RemoveReview(UID, book.ISBN)
    const updatedReviews = await FetchReviews(book.ISBN)
    setReviews(updatedReviews)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white relative rounded-xl shadow-xl w-full max-w-4xl overflow-hidden max-h-[95vh] md:max-h-[80vh] flex flex-col">
        <div className="p-6 flex-grow overflow-y-auto">
          <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col md:flex-row gap-8 my-8">
            <div className="md:w-1/2 lg:w-1/3 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={book.imageUrl || "/placeholder.svg"}
                alt={book.title}
                className="max-w-full max-h-[300px] object-contain"
              />
            </div>

            <div className="md:w-1/2 lg:w-2/3 space-y-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                <p className="text-lg text-gray-600 mt-1">{book.author}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {book.genres.map((genre, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 flex-grow">{book.description}</p>

              <div className="space-y-4">
                <p className="text-2xl font-bold text-purple-600">RS. {book.price}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(quantity - 1)}
                      className="h-10 w-10 flex items-center justify-center bg-purple-50 text-purple-600 rounded-l-lg hover:bg-purple-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="h-10 w-12 flex items-center justify-center border-y border-purple-100 bg-white text-lg">
                      {quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(quantity + 1)}
                      className="h-10 w-10 flex items-center justify-center bg-purple-50 text-purple-600 rounded-r-lg hover:bg-purple-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if(!UID){
                          navigate('/login')
                        }else{
                          onAddToCart(book.ISBN, quantity)
                        }
                      }}
                      className="h-10 w-10 flex items-center justify-center bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        if(!UID){
                          navigate('/login')
                        }else{
                          onAddToWishlist(book.ISBN)
                        }
                      }}
                      className="h-10 w-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
              {!reviews.find((book) => book.UID === UID) && (
                <button
                  onClick={() => setShowAddReview(!showAddReview)}
                  className="flex items-center text-purple-600 hover:text-purple-700"
                >
                  {showAddReview ? (
                    <>
                      <ChevronUp className="h-5 w-5 mr-1" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-5 w-5 mr-1" />
                      Add Review
                    </>
                  )}
                </button>
              )}
            </div>

            <div className={`grid gap-6 ${showAddReview ? "md:grid-cols-2" : "grid-cols-1"}`}>
              <div className={`space-y-4 ${showAddReview ? "max-h-[300px]" : "max-h-[400px]"} overflow-y-auto pr-2`}>
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-gray-900">{review.username}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.review}</p>
                    {review.UID === UID && (
                      <button onClick={handleRemoveReview} className="mt-2 text-red-600 text-sm hover:underline">
                        Delete review
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {showAddReview && (
                <div className="space-y-4 bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900">Add Your Review</h3>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button key={rating} onClick={() => setNewRating(rating)} className="focus:outline-none">
                        <Star
                          className={`h-6 w-6 ${
                            rating <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={5}
                  />
                  <button
                    onClick={handleAddReview}
                    disabled={isSubmitting || !UID}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {UID ? "Submit Review" : "Login to Review"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsModal