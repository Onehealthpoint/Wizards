import React, { useEffect, useState } from 'react';
import { FetchAllBooks } from "../Firebase/BookCRUD";
import { AddToCart } from "../Firebase/CartCRUD";
import { useAuth } from "../Firebase/Auth";
import HeroSection from "./HeroSection";

const HomeComponent = () => {
  const { UID } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await FetchAllBooks();
      setBooks(booksData);
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Books</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.slice(0,10).map((book, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img src={book.imageUrl || "/placeholder.svg"} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{book.summary}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-blue-500">Rs.{book.price}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                      onClick={() => AddToCart(UID, book.ISBN, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;