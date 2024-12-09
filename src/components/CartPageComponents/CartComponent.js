import { UID } from "../Firebase/Auth";
import { readData } from "../Firebase/CRUD";
import { where } from "firebase/firestore";
import CartItemCard from "./CartItemCard";

const CartComponent = () => {
    const cartedBooks = readData("Carts").where("UID", "==", UID);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center mt-10">Cart Page</h1>
            {
                cartedBooks.forEach(book => {
                    <CartItemCard book={book} />
                })
            }
        </div>
    );
};

export default CartComponent;