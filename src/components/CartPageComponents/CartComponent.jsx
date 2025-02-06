import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon, ShoppingCartIcon, HeartIcon, TrashIcon, CreditCardIcon, BanknoteIcon, SaveIcon, TruckIcon } from "lucide-react";
import { FetchCart, RemoveFromCart, UpdateCart } from "../Firebase/CartCRUD";
import { AddToWishlist } from "../Firebase/WishlistCRUD";
import { useAuth } from "../Firebase/Auth";
import PaymentGateway from "../PaymentPageComponents/PaymentGateway";

const CartComponent = () => {
    const {UID} = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [payForm, setPayForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    const shippingFee = 100;
    const discount = 50;
  
    useEffect(() => {
      const loadCartItems = async () => {
        if (!UID) {
          return;
        }
        try {
          setLoading(true);
          const books = await FetchCart(UID);
          setCartItems(books);
          console.log(books);
        } catch (error) {
          console.error("Error loading cart items:", error);
        } finally {
          setLoading(false);
        }
      };
  
      loadCartItems();
    }, [UID]);
  
    const updateQuantity = (ISBN, newQuantity) => {
        setCartItems(
            cartItems.map((book) => (book.ISBN === ISBN ? { ...book, quantity: Math.max(1, Math.min(10, newQuantity)) } : book)),
        );
    };

    const saveQuantity = async(ISBN, newQuantity) => {
        await UpdateCart(UID, ISBN, newQuantity);
        alert("Quantity saved successfully");
    };
  
    const buyItem = () => {
      console.log(`Buying one item`);
      setPayForm(true);
    };

    const buyCart = () => {
      console.log(`Buying one item`);
      setPayForm(true);
    };

    const handlePayConfirm = () => {

    };
  
    useEffect(() => {
      const calculateSubTotal = () => {
        setSubTotal(cartItems.reduce((total, book) => total + book.price * book.quantity, 0));
      };

      const calculateTotal = () => {
          setTotal((subTotal- (subTotal * discount) / 100));
      };

      calculateSubTotal();
      calculateTotal();
    }, [cartItems, subTotal]);

    const moveToWishlist = async(ISBN) => {
      await AddToWishlist(UID, ISBN);
      removeFromCart(ISBN);
    };
  
    const removeFromCart = async(ISBN) => {
        await RemoveFromCart(UID, ISBN);
        setCartItems(cartItems.filter((book) => book.ISBN !== ISBN));
    };
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-purple-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-900 p-8 relative">
        <div className={`max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden ${payForm ? "blur-md" : "" }`}>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-300 mb-6">Your Cart</h1>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 pr-8">
                {cartItems.map((book) => (
                  <div key={book.ISBN} className="mb-6 p-4 border border-purple-700 rounded-lg flex items-center">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-purple-300">{book.title}</h3>
                      <p className="text-purple-400">{book.author}</p>
                      <p className="text-gray-400 font-semibold text-sm mt-2">Rs. {book.price}</p>
                      <p className="text-gray-500 font-bold mt-2">Rs. {book.price * book.quantity}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(book.ISBN, book.quantity - 1)}
                          className="bg-purple-900 text-purple-300 px-2 py-1"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="bg-purple-900 text-purple-300 px-4 py-1">{book.quantity}</span>
                        <button
                          onClick={() => updateQuantity(book.ISBN, book.quantity + 1)}
                          className="bg-purple-900 text-purple-300 px-2 py-1"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => saveQuantity(book.ISBN, book.quantity)}
                          className="bg-green-900 text-green-300 mx-5 px-2 py-1"
                        >
                          <SaveIcon className="w-4 h-4" />
                        </button>
                        
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => buyItem()}
                        className="bg-purple-700 text-white px-4 py-1 rounded hover:bg-purple-800 transition-colors flex items-center justify-center"
                      >
                        <ShoppingCartIcon className="w-4 h-4 mr-1" /> Buy Now
                      </button>
                      <button
                        onClick={() => moveToWishlist(book.ISBN)}
                        className="bg-purple-900 text-purple-300 px-4 py-1 rounded hover:bg-purple-800 transition-colors flex items-center justify-center"
                      >
                        <HeartIcon className="w-4 h-4 mr-1" /> Wishlist
                      </button>
                      <button
                        onClick={() => removeFromCart(book.ISBN)}
                        className="bg-red-900 text-red-300 px-4 py-1 rounded hover:bg-red-800 transition-colors flex items-center justify-center"
                      >
                        <TrashIcon className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-300 mb-4">Cart Summary</h2>
                  <p className="text-xl text-gray-500 mb-4">SubTotal: Rs. {subTotal}</p>
                  <p className="text-xl text-gray-500 mb-4">Shipping Fee: Rs. {shippingFee}</p>
                  <p className="text-xl text-gray-500 mb-4">Discount: {discount}% </p>
                  <p className="text-xl text-gray-500 mb-4">Total: Rs. {total + shippingFee}</p>
                  <div className="space-y-4">
                    <button
                      onClick={() => buyCart()}
                      className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition-colors flex items-center justify-center"
                    >
                      <TruckIcon className="w-6 h-6 mr-2" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(payForm) && (
          <div className="z-10 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <form className="bg-gray-50 p-6 rounded-lg mb-6">
              <h1>Payment Form</h1>
              <div className="mt-4 flex justify-evenly mb-6">
                    <button
                      type="button"
                      className={`bg-${paymentMethod === "E-Sewa" ? "green" : "gray"}-300 hover:bg-${paymentMethod === "E-Sewa" ? "green" : "gray"}-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2 w-1/2 h-20`}
                      onClick={() => { setPaymentMethod("E-Sewa") }}
                    >
                      <CreditCardIcon size={40} className="mx-auto"/>
                      Pay With Esewa
                    </button>
                    <button
                      type="button"
                      className={`bg-${paymentMethod === "CoD" ? "green" : "gray"}-300 hover:bg-${paymentMethod === "CoD" ? "green" : "gray"}-400 text-gray-800 font-semibold py-2 px-4 rounded-lg w-1/2 h-20`}
                      onClick={() => { setPaymentMethod("CoD") }}
                    >
                      <BanknoteIcon size={40} className="mx-auto" />
                      Cash On Delivery
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Amount"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={`$ ${total}`}
                      onChange={(e) => e.target.value = total}
                    />
                    <textarea
                      placeholder="Description"
                      className="w-full p-2 border border-gray-300 rounded-md col-span-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handlePayConfirm}
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                    >
                      Confirm Payment
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPayForm(false);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
            </form>
          </div>
        )}
      </div>
      
    );
  }
  
  export default CartComponent;

