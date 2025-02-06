"use client"

import { useState, useEffect } from "react"
import Lottie from "lottie-react"
import { HeartIcon, ShoppingCartIcon, XIcon } from "lucide-react"
import heartAnimation from "../Animation/Wish.json"
import checkAnimation from "../Animation/Check.json"
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
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)

  useEffect(() => {
    if (book) {
      const fetchReviews = async () => {
        const reviewsData = await FetchReviews(book.ISBN)
        setReviews(reviewsData)
      }
      fetchReviews()
    }
  }, [book])

  // Don't render the modal if no book is selected
  if (!book) {
    return null
  }

  const handleAddReview = async () => {
    if (newReview.trim() && newRating > 0) {
      await AddReview(UID, username, book.ISBN, newReview, newRating)
      const updatedReviews = await FetchReviews(book.ISBN)
      setReviews(updatedReviews)
      setNewReview("")
      setNewRating(0)
    }
  }

  const handleRemoveReview = async () => {
    await RemoveReview(UID, book.ISBN)
    const updatedReviews = await FetchReviews(book.ISBN)
    setReviews(updatedReviews)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <XIcon className="w-6 h-6" />
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.imageUrl || "/placeholder.svg"}
            alt={book.title}
            className="w-full md:w-1/3 h-64 object-cover rounded-lg"
          />
          <div className="flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
            <p className="text-sm text-gray-700 mb-4">{book.summary}</p>
            <p className="text-lg font-bold text-blue-500 mb-4">Rs.{book.price}</p>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold text-gray-800">Reviews</h4>
              <div className="flex flex-col gap-2">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800">{review.username}</p>
                      {review.UID === UID && (
                        <button
                          className="text-red-500"
                          onClick={handleRemoveReview}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                    <p className="text-gray-600">{review.rating} / 5</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800">Add a Review</h4>
                <textarea
                  className="w-full p-2 border rounded-md"
                  placeholder="Write your review..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <div className="flex items-center mt-2">
                  <span className="mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`text-2xl ${star <= newRating ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => setNewRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <button
                  className="mt-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  onClick={handleAddReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                onClick={() => onAddToWishlist(book.ISBN)}
              >
                {wishlistClicked[book.ISBN] ? (
                  <Lottie
                    animationData={heartAnimation}
                    loop={false}
                    autoplay
                    style={{ width: 24, height: 24 }}
                  />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
              <button
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                onClick={() => onAddToCart(book.ISBN)}
              >
                {cartClicked[book.ISBN] ? (
                  <Lottie
                    animationData={checkAnimation}
                    loop={false}
                    autoplay
                    style={{ width: 24, height: 24 }}
                  />
                ) : (
                  <ShoppingCartIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsModal