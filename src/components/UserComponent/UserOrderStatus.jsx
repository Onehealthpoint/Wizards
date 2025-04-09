"use client"

import { useEffect, useState } from "react"
import { FetchTransactions } from "../Firebase/Transactions"
import { useAuth } from "../Firebase/Auth"
import { Loader } from "../Loader/Loader"
import { GetBookNameByISBN } from "../Firebase/BookCRUD"
import { SearchBooksByTitle } from "../Firebase/SearchBooks"
import { AddToWishlist } from "../Firebase/WishlistCRUD"
import { AddToCart } from "../Firebase/CartCRUD"
import { AddReview, FetchReviews } from "../Firebase/ReviewCRUD"
import { Eye, X } from "lucide-react"
import BookDetailModel from "../HomePageComponents/BookDetailModel"
import { AddOrUpdateReturn } from "../Firebase/ReturnCRUD"

const UserOrderStatus = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [bookNames, setBookNames] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [wishlistClicked, setWishlistClicked] = useState({})
  const [cartClicked, setCartClicked] = useState({})
  const [setReviews] = useState([])
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)
  const [setIsSubmitting] = useState(false)
  const [setShowSubmitAnimation] = useState(false)
  const { User, UID } = useAuth()

  const handleViewDetails = async (order) => {
    setSelectedOrder(order)
    if (order.ISBN && Array.isArray(order.ISBN)) {
      const names = await Promise.all(order.ISBN.map((ISBN) => GetBookNameByISBN(ISBN)))
      setBookNames(names.filter(Boolean)) // Filter out any undefined or null values
    } else {
      setBookNames([])
    }
  }

  const handleCloseModal = () => {
    setSelectedOrder(null)
    setBookNames([])
  }

  const handleBookNameClick = async (name) => {
    try {
      const books = await SearchBooksByTitle(name)
      if (books.length > 0) {
        setSelectedBook(books[0])
      }
    } catch (error) {
      console.error("Error fetching book details:", error)
    }
  }

  const closeBookDetails = () => {
    setSelectedBook(null)
  }

  const moveToWishlist = async (ISBN) => {
    if (!UID) {
      console.error("User ID is undefined")
      return
    }
    try {
      await AddToWishlist(ISBN)
      setWishlistClicked((prevState) => ({ ...prevState, [ISBN]: true }))
    } catch (error) {
      console.error("Error adding to wishlist:", error)
    }
  }

  const addToCart = async (ISBN, qty) => {
    if (!UID) {
      console.error("User ID is undefined")
      return
    }
    try {
      await AddToCart(UID, ISBN, qty)
      setCartClicked((prevState) => ({ ...prevState, [ISBN]: true }))
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const handleAddReview = async () => {
    console.log("handleAddReview called")
    console.log("newReview:", newReview)
    console.log("newRating:", newRating)
    console.log("User:", User)
    console.log("selectedBook:", selectedBook)

    if (newReview.trim() && newRating > 0 && User && User.displayName && selectedBook) {
      setIsSubmitting(true)
      setShowSubmitAnimation(true)
      try {
        await AddReview(UID, User.displayName, selectedBook.ISBN, newReview, newRating)
        const updatedReviews = await FetchReviews(selectedBook.ISBN)
        setReviews(updatedReviews)
        setNewReview("")
        setNewRating(0)
        console.log("Review added successfully")
      } catch (error) {
        console.error("Error adding review: ", error)
      } finally {
        setTimeout(() => {
          setIsSubmitting(false)
          setShowSubmitAnimation(false)
        }, 2000)
      }
    } else {
      console.error("Invalid review data or user information")
    }
  }

  const handleReturnBook = async (ISBN) => {
    if (!UID) {
      console.error("User ID is undefined")
      return
    }
    try {
      const returnData = {
        ISBN: ISBN,
        UID: UID,
        Status: "Pending",
        Remark: "",
      }
      await AddOrUpdateReturn(returnData)
      alert("Return request submitted successfully")
    } catch (error) {
      console.error("Error submitting return request:", error)
    }
  }

  useEffect(() => {
    if (selectedBook) {
      const fetchReviews = async () => {
        try {
          const reviewsData = await FetchReviews(selectedBook.ISBN)
          setReviews(reviewsData)
        } catch (error) {
          console.error("Error fetching reviews:", error)
        }
      }
      fetchReviews()
    }
  }, [selectedBook])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!UID) {
        setError("User not authenticated")
        setLoading(false)
        return
      }
      try {
        const transactions = await FetchTransactions(UID)
        setOrders(transactions)
      } catch (err) {
        setError("Failed to fetch orders")
        console.error("Error fetching orders:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [UID])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{order.transaction_uuid || "N/A"}</td>
                <td className="px-4 py-2">{order.status || "Pending"}</td>
                <td className="px-4 py-2">{order.amount || "N/A"}</td>
                <td className="px-4 py-2 ">{order.transaction_code || "N/A"}</td>
                <td className="px-4 py-2">{order.paymentMethod || "N/A"}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewDetails(order)}>
                    <Eye className="inline-block w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={handleCloseModal}>
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <div className="mb-4">
              <p>
                <strong>Order ID:</strong> {selectedOrder.transaction_uuid || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status || "Pending"}
              </p>
              <p>
                <strong>Amount:</strong> {selectedOrder.amount || "N/A"}
              </p>
              <p>
                <strong>Code:</strong> {selectedOrder.transaction_code || "N/A"}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod || "N/A"}
              </p>
              <p>
                <strong>Book Names:</strong>
              </p>
              <ul>
                {bookNames.map((name, i) => (
                  <li key={i} className="flex items-center justify-between mb-2">
                    <span
                      onClick={() => handleBookNameClick(name)}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {name}
                    </span>
                    <button
                      onClick={() => handleReturnBook(selectedOrder.ISBN[i])}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded"
                    >
                      Return
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Render the modal if a book is selected */}
      {selectedBook && (
        <BookDetailModel
          book={selectedBook}
          UID={UID}
          username={User.displayName}
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

export default UserOrderStatus

