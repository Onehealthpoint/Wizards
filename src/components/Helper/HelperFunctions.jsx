import { Filter } from 'bad-words';

export const IsBookValid = (book) => {
    console.log(book);
    if(
        book.title === "" || 
        book.author === "" || 
        book.genres.length === 0 || 
        book.price === 0 || 
        book.description === "" || 
        book.image === "" || 
        book.ISBN === ""
    ){
        return false;
    }
    return true;
};


export const ProfanityCheck = (review) => {
    const nepaliProfanityWords = [
        "bhosdi", "bhosdika", "bitchi", "boka", "bokaa", "bahenchod", "chak", "chikdai",
        "chikeko", "chikna", "chikney", "dambo", "gandu", "gando", "haraam", "jatha",
        "jhand", "jatho", "jhant", "kando", "khalasi", "khate", "kukur", "kutta", "lado",
        "landey", "lauro", "lutte", "madharchod", "napunsak", "pute", "radi", "randi",
        "rand", "sadi", "suar", "sukumbaasi", "syar", "tatto", "xaddey"
    ];

    const filter = new Filter();
    filter.addWords(nepaliProfanityWords);
    return filter.isProfane(review);
};


export const IsReviewValid = (UID, username, ISBN, review, rating) => {
    if (review === ""){
        console.log("Review cannot be empty");
        return false;
    }

    if (rating < 1 || rating > 5){
        console.log(review.rating, "Review Rating not in range");
        return false;
    } 

    if (UID === "" ){
        console.log("User not logged in");
        return false;
    }

    if (ISBN === "" ){
        console.log("ISBN not found");
        return false;
    }

    if (username === ""){
        console.log("Username not found");
        return false;
    }

    if (ProfanityCheck(review.review)){
        alert("Profanity not allowed");
        return false;
    }

    return true;
};