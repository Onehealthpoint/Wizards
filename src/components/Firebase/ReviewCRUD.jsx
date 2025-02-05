import { IsReviewValid } from '../Helper/HelperFunctions';
import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";

export const FetchReviews = async (ISBN) => {
    try{
        const reviews = [];
        const q = query(collection(db, "Reviews"), where("ISBN", "==", ISBN));
        const reviewQuerySnapshot = await getDocs(q);
        reviewQuerySnapshot.forEach((doc) => {
            reviews.push(doc.data());
        });
        return reviews;
    }catch(e){
        console.error("Error CRUD:FetchReviews ==> ", e);
    }
}

export const AddReview = async (UID, username, ISBN, review, rating) => {
    try{
        const q = query(collection(db, "Reviews"), where("UID", "==", UID), where("ISBN", "==", ISBN));
        const reviewQuerySnapshot = await getDocs(q);
        if(reviewQuerySnapshot.size !== 0){
            console.log("Review already exists");
            return;
        }
        if(!IsReviewValid(UID, username, ISBN, review, rating))
        await addDoc(collection(db, "Reviews"), {
            UID: UID,
            ISBN: ISBN,
            username: username,
            review: review,
            rating: rating
        });
    }catch(e){
        console.error("Error CRUD:AddReview ==> ", e);
    }
}

export const RemoveReview = async (UID, ISBN) => {
    try{
        const q = query(collection(db, "Reviews"), where("UID", "==", UID), where("ISBN", "==", ISBN));
        const reviewQuerySnapshot = await getDocs(q);
        if(reviewQuerySnapshot.size === 0){
            console.log("Review not found");
            return;
        }
        for(const docObj of reviewQuerySnapshot.docs){
            await deleteDoc(doc(db, "Reviews", docObj.id));
        }
    }catch(e){
        console.error("Error CRUD:RemoveReview ==> ", e);
    }
};

