// src/components/Product.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../Firebase/Init'; // Import the Firebase app

const db = getFirestore(app); // Get Firestore instance

const Product = () => {
    const { bookId } = useParams(); // Get the dynamic bookId from URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!bookId) return;

        const fetchBookData = async () => {
            try {
                const docRef = doc(db, 'books', bookId); // Fetch book by ID from Firestore
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setBook(docSnap.data());
                } else {
                    console.log('No such book!');
                }
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookData();
    }, [bookId]);

    if (loading) return <p>Loading...</p>;

    if (!book) return <p>Book not found!</p>;

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Details</h1>
                <div className="flex flex-col md:flex-row">
                    {/* Book Image */}
                    <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                        <img
                            src={book.imageUrl || 'https://via.placeholder.com/300x400'}
                            alt={book.title || 'Book Cover'}
                            className="w-64 h-80 object-cover rounded-md shadow-md"
                        />
                    </div>

                    {/* Book Description */}
                    <div className="w-full md:w-1/2 pl-0 md:pl-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
                        <p className="text-gray-600 mb-4">{book.description}</p>
                        <p className="text-gray-700 font-medium mb-4">
                            Price: <span className="text-green-600">${book.price}</span>
                        </p>

                        {/* Add to Cart Section */}
                        <div className="flex items-center space-x-4">
                            <button
                                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                Add to Cart
                            </button>
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
