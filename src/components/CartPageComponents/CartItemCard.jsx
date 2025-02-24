const CartItemCard = (Book) => {
    // This is for the ease of understanding the structure of the Book object 
    // DO NOT DELETE UNTIL THE COMPONENT IS COMPLETELY IMPLEMENTED

    //  Book = [book, qty]
    //  book = {
    //      title: "Book Title",                    string
    //      author: "Book Author",                  string
    //      genre: ["Genre1", "Genre2", "Genre3"],  array of strings
    //      price: 10.00,                           float
    //      description: "Book Description",        string
    //      imageUrl: "Book Image URL",                Url
    //      id: "Book ID"                           string
    //  }
    //  qty = 1                                     int
    
    
    const book = Book.book[0];
    const qty = Book.book[1];

    return(
        <div className="h-20 w-full flex items-center justify-between border-b border-purple-700 bg-purple-100 p-2">
            <img src={ book.imageUrl } alt={ book.title } className="h-20 w-20 object-contain" />
            Book: { book.title } ||
            { book.author } ||
            { book.genre.join(", ") } ||
            { book.price } ||
            { book.description } ||
            { book.imageUrl } ||
            { book.id } ||
            { qty }
            <div className="flex items-center">
                <div className="mr-2">Qty: { qty }</div>
                <div className="mr-2">Price: ${ book.price }</div>
                <div className="mr-2">Total: ${ }</div>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </div>
        </div>
    );
};

export default CartItemCard;