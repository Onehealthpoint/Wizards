import { useState, useEffect } from "react";
import { AddBook, FetchAllBooks } from "../Firebase/CRUD";
import { IsBookValid } from "../Helper/HelperFunctions";
import { CartLoader } from "../Loader/Loader";


const AdminComponent = () => {
    const [booklist, setBooklist] = useState([]);
    const [file, setFile] = useState(null);
    const [add, setAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [book, setBook] = useState({
        title: "",
        author: "",
        genres: [],
        price: 0.0,
        description: "",
        image: "",
        id: ""
    });

    const handleDelete = (id) => {
        //
        // add a delete function here   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //
        const newBookList = booklist.filter((book) => book.id !== id);
        setBooklist(newBookList);
    };

    const handleEdit = (id) => {
        //
        // add an edit function here   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //
        alert("Edit book with id(ISBN): " + id + "\nEdit Function Under Construction!");
    };

    const HandleAdd = () => {
        setAdd(true);
    };

    const handleSubmitAddOneBook = (e) => {
        e.preventDefault();

        // Check if price is a number
        if(isNaN(book.price)){
            alert("Price must be a number");
            setBook({ ...book, price: 0.0 });
            return;
        }

        // Check if book fields are empty
        if(!IsBookValid(book)){
            alert("Book fields cannot be empty");
            return;
        }

        AddBook(book);
        setAdd(false);
        setFile(null);
        setBook({
            title: "",
            author: "",
            genres: [],
            price: 0.0,
            description: "",
            imageUrl: "",
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

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await FetchAllBooks();
                setBooklist(data || []);
            } catch (e) {
                console.error("Error FetchBooks: ", e);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        if(booklist.length > 0) setLoading(false);
    }, [booklist]);
    

    if(add) return(
        <div className="p-6 bg-gray-100 flex flex-col items-center">
            <span className="lg:w-1/4 flex flex-row items-center text-center justify-between">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 ">Add Item</h3>
                <button className="mb-4 p-2 rounded font-extrabold border border-red-600 bg-red-300 text-red-600" 
                        onClick={()=>{
                            setAdd(false);
                            setFile(null);
                            setBook({
                                title: "",
                                author: "",
                                genres: [],
                                price: 0.0,
                                description: "",
                                imageUrl: "",
                                id: ""
                            });
                        }}
                >❌</button>
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
                            setBook({
                                title: "",
                                author: "",
                                genres: [],
                                price: 0.0,
                                description: "",
                                imageUrl: "",
                                id: ""
                            });
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
                        placeholder="Genres [Seperated by comma]"
                        className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                        value={book.genres}
                        onChange={(e) => {
                            const inputGenre = e.target.value.split(",");
                            setBook({ ...book, genres: inputGenre});
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        className="lg:w-1/4 p-2 border border-gray-300 rounded-md"
                        value={book.price === 0.0 ? "" : book.price}
                        onChange={(e) =>setBook({ ...book, price: e.target.value })}
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
                        value={book.imageUrl}
                        onChange={(e) => setBook({ ...book, imageUrl: e.target.value })}
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
        <div className="p-6 bg-gray-100  flex flex-col items-center w-full">
            <div className="bg-white rounded-lg shadow-md p-6 w-[40%]">
                <div className="flex flex-col items-center mx-auto">
                    <img
                        src={/*USER PROFILE PICTURE HERE*/""}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">User{/*USER NAME HERE*/}Name</h2>
                </div>
        
                <div className="mt-6 w-[80%] mx-auto border-b-2 border-gray-300">
                    <span className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">ADMIN PANEL</h3>
                        <button className="mb-4 p-2 rounded border bg-green-200 border-green-400" 
                            onClick={()=>{
                                HandleAdd();
                            }}
                        >➕</button>
                    </span>
                </div>
                
                <div className="flex flex-col items-center">
                    {loading?
                        <CartLoader/>
                        :
                        <div className="w-[80%]">
                            {booklist.map((book) => (
                                <div key={book.id} className="flex flex-row items-center border-b-2 border-gray-300 py-4">
                                    <div className="flex flex-row items-center min-w-full justify-between gap-10">
                                        <div className="flex flex-col gap-2 items-center w-1/4">
                                            <img src={book.imageUrl} alt={book.title} className="w-16 h-16 object-cover rounded-md"/>
                                            <h3 className="text-lg font-semibold text-gray-800">${book.price}</h3>
                                        </div>
                                        <div className="flex flex-col ml-4 w-1/2">
                                            <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                                            <h4 className="text-md font-semibold text-gray-600">{book.author}</h4>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center w-1/4">
                                            <button className="p-2 rounded font-extrabold border border-yellow-600 bg-yellow-300 text-yellow-600" 
                                                    onClick={()=>{
                                                        handleEdit(book.id);
                                                    }}
                                            >🖊️</button>
                                            <button className="p-2 rounded font-extrabold border border-red-600 bg-red-300 text-red-600" 
                                                    onClick={()=>{
                                                        handleDelete(book.id);
                                                    }}
                                            >❌</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminComponent;