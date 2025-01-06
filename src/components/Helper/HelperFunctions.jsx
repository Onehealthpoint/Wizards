export const IsBookValid = (book) => {
    console.log(book);
    if(
        book.title === "" || 
        book.author === "" || 
        book.genres.length === 0 || 
        book.price === 0 || 
        book.description === "" || 
        book.image === "" || 
        book.id === ""
    ){
        return false;
    }
    return true;
};

