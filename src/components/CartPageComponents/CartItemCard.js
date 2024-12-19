const CartItemCard = (Book) => {
    const book = Book.book[0];
    const qty = Book.book[1];
    console.log(Book);
    return(
        <div className="h-20 w-full flex items-center justify-between border-b border-purple-200">
            Book: { book.title }
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