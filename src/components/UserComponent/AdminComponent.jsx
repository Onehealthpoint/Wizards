import { useState, useEffect } from "react";
import { FetchAllBooks, AddBook, UpdateBook, RemoveBook } from "../Firebase/BookCRUD";
import { IsBookValid } from "../Helper/HelperFunctions";
import { PlusIcon, PencilIcon, TrashIcon, UploadIcon, ArrowDown, ArrowUp } from "lucide-react"
import { useAuth } from "../Firebase/Auth";


const AdminComponent = () => {
    const { User } = useAuth();

    const initialBookState = {
      title: "",
      author: "",
      genres: [],
      price: 0.0,
      description: "",
      imageUrl: "",
      ISBN: "",
    };

    const [booklist, setBooklist] = useState([]);
    const [file, setFile] = useState(null);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adminName, setAdminName] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });
  
    const [book, setBook] = useState(initialBookState);

    useEffect(() => {
        if(User){
            setAdminName(User.displayName);
        }else{
            setAdminName("Admin");
        }
    }, [User]);
  
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          setLoading(true);
          const data = await FetchAllBooks();
          setBooklist(data || []);
        } catch (e) {
          console.error("Error fetching books:", e);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBooks();
    }, []);
  
    const handleDelete = async (ISBN) => {
      if (window.confirm("Are you sure you want to delete this book?")) {
        await RemoveBook(ISBN);
        setBooklist(booklist.filter((book) => book.ISBN !== ISBN));
      }
    };
  
    const handleEdit = (ISBN) => {
      const bookToEdit = booklist.find((book) => book.ISBN === ISBN);
      setBook(bookToEdit);
      setEdit(true);
    };
  
    const handleAdd = () => {
      setAdd(true);
      setEdit(false);
      setBook(initialBookState);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (isNaN(book.price)) {
        alert("Price must be a number");
        setBook({ ...book, price: 0.0 });
        return;
      }
  
      if (!IsBookValid(book)) {
        alert("All fields are required");
        return;
      }
  
      try {
        setLoading(true)
        if (edit) {
          await UpdateBook(book);
          setBooklist(booklist.map((b) => (b.ISBN === book.ISBN ? book : b)));
        } else {
          await AddBook(book);
          const newBooklist = await FetchAllBooks();
          setBooklist(newBooklist || []);
        }
        setAdd(false);
        setEdit(false);
        setBook(initialBookState);
      } catch (error) {
        console.error("Error submitting book:", error);
        alert("An error occurred while submitting the book");
      } finally {
        setLoading(false);
      }
    };
  
    const handleUpload = async () => {
      if (!file) {
        alert("No file selected");
        return;
      }
  
      if (file.type !== "application/json") {
        alert("Invalid file type. Please upload a JSON file.");
        return;
      }
  
      try {
        setLoading(true);
        const text = await file.text();
        const books = JSON.parse(text);
  
        for (const newBook of books) {
          if (IsBookValid(newBook)) {
            await AddBook(newBook);
          } else {
            console.log("Invalid book data:", newBook);
          }
        }
  
        const updatedBooks = await FetchAllBooks();
        setBooklist(updatedBooks || []);
  
        setFile(null);
        alert("Books uploaded successfully!");
      } catch (e) {
        console.error("Error uploading books:", e);
        alert("An error occurred while uploading books");
      } finally {
        setLoading(false);
      }
    };

    const handleSort = (key) => {
      setSortConfig({
        key,
        direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
      });
  
      setBooklist(
        [...booklist].sort((a, b) => {
          if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
          if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        }),
      );
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 italic font-light">Welcome, {adminName}</p>
            </div>
  
            <div className="flex justify-between items-center mb-6 mt-6">
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Book
              </button>
  
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`${
                    file
                      ? "bg-green-300 hover:bg-green-400 cursor-default"
                      : "bg-green-500 hover:bg-green-600 cursor-pointer"
                  } text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors duration-200`}
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                  {file ? "File Selected" : "Choose File"}
                </label>
                <button
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center disabled:opacity-50"
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                  Upload Books
                </button>
              </div>
            </div>
  
            {(add || edit) && (
              <form className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">{edit ? "Edit Book" : "Add New Book"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="ISBN"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={book.ISBN}
                    onChange={(e) => setBook({ ...book, ISBN: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={book.title}
                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={book.author}
                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Genres (comma-separated)"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={book.genres.join(", ")}
                    onChange={(e) => setBook({ ...book, genres: e.target.value.split(",").map((g) => g.trim()) })}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={book.price}
                    onChange={(e) => setBook({ ...book, price: Number.parseFloat(e.target.value) })}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={book.imageUrl}
                    onChange={(e) => setBook({ ...book, imageUrl: e.target.value })}
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded-md col-span-2"
                    value={book.description}
                    onChange={(e) => setBook({ ...book, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                  >
                    {loading ? "Saving..." : edit ? "Update Book" : "Add Book"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdd(false)
                      setEdit(false)
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
  
            {loading && !add && !edit ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading books...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">
                        <button
                          onClick={() => handleSort("title")}
                          className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                        >
                          Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? <ArrowUp/> : <ArrowDown/>)}
                        </button>
                      </th>
                      <th className="py-3 px-4 text-left">
                        <button
                          onClick={() => handleSort("author")}
                          className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                        >
                          Author {sortConfig.key === "author" && (sortConfig.direction === "asc" ? <ArrowUp/> : <ArrowDown/>)}
                        </button>
                      </th>
                      <th className="py-3 px-4 text-left">
                        <button
                          onClick={() => handleSort("price")}
                          className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                        >
                          Price {sortConfig.key === "price" && (sortConfig.direction === "asc" ? <ArrowUp/> : <ArrowDown/>)}
                        </button>
                      </th>
                      <th className="py-3 px-4 text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {booklist.map(
                      (book) =>
                        book && (
                          <tr key={book.ISBN} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4">{book.title}</td>
                            <td className="py-3 px-4">{book.author}</td>
                            <td className="py-3 px-4">Rs.{book.price}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => {
                                  handleEdit(book.ISBN);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="text-blue-500 hover:text-blue-600 mr-2"
                              >
                                <PencilIcon className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleDelete(book.ISBN)} className="text-red-500 hover:text-red-600">
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminComponent;