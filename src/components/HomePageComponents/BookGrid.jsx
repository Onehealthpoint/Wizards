// src/components/BookGrid.js

const books = [
    {
      title: "Palpasa Café",
      author: "Narayan Wagle",
      price: "Rs. 500",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1537611048i/23618412.jpg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: "Rs. 1600",
      image: "https://m.media-amazon.com/images/I/71zHDXu1TaL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: "Rs. 1800",
      image: "https://booksmandala.com/_next/image?url=https%3A%2F%2Fbooks.bizmandala.com%2Fmedia%2Fbooks%2F9789387779679%2Fimage_15j5s9V.jpeg&w=1080&q=75",
    },
    {
      title: "Me Before You",
      author: "Jojo Moyes",
      price: "Rs. 1278",
      image: "https://cdn2.penguin.com.au/covers/original/9780718177027.jpg",
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      price: "Rs. 2238",
      image: "https://media.thuprai.com/products/9780552161275.jpg",
    },
    
  ];
  
  const BookGrid = () => {
    return (
        <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Best Sellers</h1>
        <p className="mb-6 text-gray-600">Find Your Next Great Read Among Our Best Sellers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-32 h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-medium text-center">{book.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
              <p className="font-semibold text-blue-600">{book.price}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>     
    );
  };
  
  export default BookGrid;
  