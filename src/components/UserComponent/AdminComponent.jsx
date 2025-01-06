import { useState } from "react";
import { AddBook } from "../Firebase/CRUD";
import { IsBookValid } from "../Helper/HelperFunctions";


const AdminComponent = () => {
    const [wishlist, setWishlist] = useState([]);
    const[file, setFile] = useState(null);
    const[add, setAdd] = useState(false);
    // const[loading, setLoading] = useState(false);
    
    const[book, setBook] = useState({
      title: "",
      author: "",
      genres: [],
      price: 0.0,
      description: "",
      image: "",
      id: ""
    });

    const handleDelete = (id) => {
        wishlist.filter((item) => item.id !== id);
    };

    const HandleAdd = () => {
        setAdd(true);
    };

    const handleSubmitAddOneBook = (e) => {
        e.preventDefault();
        // Check if book fields are empty
        if(!IsBookValid(book)){
            alert("Book fields cannot be empty");
            return;
        }
        AddBook(book);
        setAdd(false);
        setBook({
            title: "",
            author: "",
            genres: [],
            price: 0.0,
            description: "",
            image: "",
            id: ""
        });
    };


    const HandleUpload = async() => {
        if(!file){ 
            alert("No file selected");
            return;
        }

        if(file.type !== "application/json"){
            alert("Invalid file type");
            return;
        }

        try {
            const text = await file.text();
            const books = JSON.parse(text);
    
            for (const book of books) {
                if (IsBookValid(book)) {
                    await AddBook(book);
                } else {
                    console.log("Invalid book data: ", book);
                }
            }
        } catch (e) {
            console.error("Error AdminComponent:HandleUpload ==> ", e);
        }
    };

    if(add) return(
            <div className="p-6 bg-gray-100 flex flex-col items-center">
                <span className="lg:w-1/4 flex flex-row items-center text-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 ">Add Item</h3>
                    <button className="mb-4 p-1 w-10 rounded font-extrabold text-xl border border-red-600 bg-red-300 text-red-600" onClick={()=>{setAdd(false)}}>x</button>
                </span>
                <span className="lg:w-1/4 flex flex-row items-center my-4">
                    <form className="space-y-4">
                        <input 
                            type="file"
                            accept=".json" 
                            onChange={(e) => setFile(e.target.files[0])} 
                            required
                        />
                        <button 
                            className="lg:w-32 bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                            type="button"
                            onClick={()=>{
                                HandleUpload();
                                setAdd(false);
                                setFile(null);
                            }}
                        >Upload</button>
                    </form>
                </span>
                <form className="space-y-4 w-full mt-4">
                    <div className="flex flex-col items-center w-full gap-y-4">
                        <input
                            type="text"
                            placeholder="ISBN"
                            className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                            value={book.id}
                            onChange={(e) => setBook({ ...book, id: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                            value={book.title}
                            onChange={(e) => setBook({ ...book, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Author"
                            className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                            value={book.author}
                            onChange={(e) => setBook({ ...book, author: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Genres [Seperate by comma]"
                            className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                            value={book.genres}
                            onChange={(e) => {
                                const inputGenre = e.target.value.split(",");
                                setBook({ ...book, genres: inputGenre});
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                            value={book.price}
                            onChange={(e) => setBook({ ...book, price: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                            value={book.description}
                            onChange={(e) => setBook({ ...book, description: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image"
                            className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                            value={book.image}
                            onChange={(e) => setBook({ ...book, image: e.target.value })}
                        />
                        <button
                            className="w-32 bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                            type="button"
                            onClick={handleSubmitAddOneBook}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
    );

    return (
        <div className="p-6 bg-gray-100  flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">

          <div className="flex flex-col items-center">
            <img
              src={"user.profilePic"}//USER PIC HERE
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{/*USER NAME HERE*/}</h2>
          </div>
  
          <div className="mt-6">
            <span className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">ADMIN PANEL</h3>
                <button className="mb-4 p-1 w-10 rounded font-extrabold text-xl border bg-green-200 border-green-400 text-green-700" onClick={()=>{HandleAdd()}}>+</button>
            </span>
          </div>
        </div>
      </div>
    );
};

export default AdminComponent;