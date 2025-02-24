import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MinusIcon, PlusIcon, ShoppingCartIcon, HeartIcon, TrashIcon, CreditCardIcon, BanknoteIcon, TruckIcon } from "lucide-react";
import { FetchCart, RemoveFromCart, UpdateCart } from "../Firebase/CartCRUD";
import { AddTransaction } from "../Firebase/Transactions";
import { AddToWishlist } from "../Firebase/WishlistCRUD";
import { getDateTime, generateRandomCode } from "../Helper/HelperFunctions";
import { useAuth } from "../Firebase/Auth";
import PaymentGateway from "../PaymentPageComponents/PaymentGateway";

const CartComponent = () => {
    const navigate = useNavigate();

    const {User, UID} = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState(`${User? User.displayName : ""}`);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [payForm, setPayForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [purchaseType, setPurchaseType] = useState("");
    const [TID, setTID] = useState("");

    const shippingFee = 150;
    const discount = 2;

    const setEmpty = () => {
      setPaymentMethod("");
      setName(`${User?.displayName || ""}`);
      setAddress("");
      setPhone("");
      setPurchaseType("");
      setAmount(0);
      setPayForm(false);
    };
  
    useEffect(() => {
      const loadCartItems = async () => {
        if (!UID) {
          return;
        }
        try {
          setLoading(true);
          const books = await FetchCart(UID);
          books.forEach((book) => {
            book.printType = "softcover";
          });
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
  
    const updateQuantity = async(ISBN, newQuantity) => {
        const qty = Math.max(1, Math.min(10, newQuantity));

        if(qty === cartItems.find((book) => book.ISBN === ISBN).quantity){
          return;
        }

        await UpdateCart(UID, ISBN, qty);
        setCartItems(
            cartItems.map((book) => (book.ISBN === ISBN ? { ...book, quantity: qty } : book)),
        );
    };
  
    const buyItem = (ISBN) => {
      console.log(`Buying one item`);
      setPayForm(true);
      setPurchaseType(ISBN);
    };

    const buyCart = () => {
        console.log(`Buying all items`);
        setPayForm(true);
        setPurchaseType("multiple");
    };

    const handlePayConfirm = async () => {
        if (name === "" || address === "" || phone === "" || paymentMethod === "" || purchaseType === "") {
            setEmpty();
            return;
        }
        if (purchaseType === "multiple") {
            for(const book of cartItems){
              await removeFromCart(book.ISBN);
            }
        }
        else{
          await removeFromCart(purchaseType);
        }

        const order = {
          UID: UID,
          ISBN: purchaseType === "multiple" ? cartItems.map((book) => book.ISBN) : purchaseType,
          quantity: purchaseType === "multiple" ? cartItems.map((book) => book.quantity) : cartItems.find((book) => book.ISBN === purchaseType).quantity,
          printType: purchaseType === "multiple" ? cartItems.map((book) => book.printType) : cartItems.find((book) => book.ISBN === purchaseType).printType,
          name: name,
          address: address,
          phone: phone,
          paymentMethod: paymentMethod,
          purchaseType: purchaseType === "multiple" ? "multiple" : "single",
          amount: amount,
          transaction_uuid: TID,
          transaction_code: generateRandomCode(),
          status: "Pending"
        };
        await AddTransaction(order);

        if (paymentMethod === "E-Sewa") {
          setEmpty();
          document.getElementById("esewaForm").submit();
        }else{
          setEmpty();
          navigate("/CodPayment");
        }
    };
  
    const calculateAdjustedPrice = useCallback((price, quantity, printType) => {
      const printCost = {
        softcover: 0,
        hardcover: 100,
        braille: 0.2,
        largeprint: 0.1,
      };
      if (printType === "hardcover") {
        return (price + printCost[printType]) * quantity;
      }else{
        return (price + price * printCost[printType]) * quantity;
      }
    }, []);

    useEffect(() => {
      const calculateSubTotal = () => {
        setSubTotal(
          cartItems.reduce(
            (total, book) =>
              total + calculateAdjustedPrice(book.price, book.quantity, book.printType),
            0,
          ),
        )
      }

      const calculateTotal = () => {
          setTotal((subTotal- (subTotal * discount) / 100));
      };

      calculateSubTotal();
      calculateTotal();
    }, [cartItems, subTotal, calculateAdjustedPrice]);

    const moveToWishlist = async(ISBN) => {
      await AddToWishlist(UID, ISBN);
      removeFromCart(ISBN);
    };
  
    const removeFromCart = async (ISBN) => {
        await RemoveFromCart(UID, ISBN);
        setCartItems(cartItems.filter((book) => book.ISBN !== ISBN));
    };
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
        </div>
      )
    }
  
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
        <div className={`max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${payForm ? "opacity-50" : ""}`}>
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              <div className="lg:w-2/3">
                {cartItems.map((book) => (
                  <div
                    key={book.ISBN}
                    className="mb-6 p-4 border border-gray-200 rounded-lg flex flex-col flex-grow sm:flex-row items-center sm:items-start md:items-center"
                  >
                    <img
                      src={book.imageUrl || "/placeholder.svg"}
                      alt={book.title}
                      className="w-32 h-48 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                      <p className="text-gray-700">{book.author}</p>
                      <p className="text-gray-600">Rs. {calculateAdjustedPrice(book.price, 1, book.printType).toFixed(2)}</p>
                      <div className="mt-2 space-y-2">
                        <select
                          className="border rounded p-1 text-sm w-full sm:w-auto"
                          value={book.printType}
                          onChange={(e) =>
                            setCartItems(
                              cartItems.map((item) =>
                                item.ISBN === book.ISBN ? { ...item, printType: e.target.value } : item,
                              ),
                            )
                          }
                        >
                          <option value="softcover">Softcover</option>
                          <option value="hardcover">Hardcover</option>
                          <option value="braille">Braille</option>
                          <option value="largeprint">Large Print</option>
                        </select>
                        <p className="text-gray-700 font-semibold">
                          Rs. {calculateAdjustedPrice(book.price, book.quantity, book.printType).toFixed(2)}
                        </p>
                        <div className="flex items-center sm:justify-start space-x-2">
                          <button
                            onClick={() => updateQuantity(book.ISBN, book.quantity - 1)}
                            className="bg-gray-200 text-gray-800 p-1 rounded"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded">{book.quantity}</span>
                          <button
                            onClick={() => updateQuantity(book.ISBN, book.quantity + 1)}
                            className="bg-gray-200 text-gray-800 p-1 rounded"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-2 mt-4 sm:mt-0 sm:ml-4">
                      <button
                        onClick={() => {
                          buyItem(book.ISBN)
                          setAmount(calculateAdjustedPrice(book.price, book.quantity, book.printType) + shippingFee)
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                      >
                        <ShoppingCartIcon className="w-4 h-4 mr-2" /> Buy Now
                      </button>
                      <button
                        onClick={() => moveToWishlist(book.ISBN)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors flex items-center justify-center"
                      >
                        <HeartIcon className="w-4 h-4 mr-2" /> Wishlist
                      </button>
                      <button
                        onClick={() => removeFromCart(book.ISBN)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                      >
                        <TrashIcon className="w-4 h-4 mr-2" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart Summary</h2>
                  <p className="text-lg text-gray-700 mb-2">SubTotal: Rs. {subTotal.toFixed(2)}</p>
                  <p className="text-lg text-gray-700 mb-2">Shipping Fee: Rs. {shippingFee.toFixed(2)}</p>
                  <p className="text-lg text-gray-700 mb-2">Discount: {discount}% on Cart</p>
                  <p className="text-xl text-gray-800 font-bold mb-4">Total: Rs. {(total + shippingFee).toFixed(2)}</p>
                  <button
                    disabled={cartItems.length === 0}
                    onClick={() => {
                      buyCart()
                      setAmount(total + shippingFee)
                    }}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <TruckIcon className="w-6 h-6 mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {payForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Form</h2>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`${
                    paymentMethod === "E-Sewa" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                  } hover:bg-green-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors flex flex-col items-center justify-center`}
                  onClick={() => {
                    setTID(`${UID}-${getDateTime()}`)
                    setPaymentMethod("E-Sewa")
                  }}
                >
                  <CreditCardIcon size={24} className="mb-1" />
                  Pay With Esewa
                </button>
                <button
                  type="button"
                  className={`${
                    paymentMethod === "CoD" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                  } hover:bg-green-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors flex flex-col items-center justify-center`}
                  onClick={() => {
                    setTID(`${UID}-${getDateTime()}`)
                    setPaymentMethod("CoD")
                  }}
                >
                  <BanknoteIcon size={24} className="mb-1" />
                  Cash On Delivery
                </button>
              </div>
              <div className="space-y-4">
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
                  onChange={(e) => {
                    const phoneno = /^\d{0,10}$/
                    if (e.target.value.match(phoneno)) {
                      setPhone(e.target.value)
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={`Rs. ${amount.toFixed(2)}`}
                  readOnly
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handlePayConfirm}
                  disabled={loading || paymentMethod === "" || name === "" || address === "" || phone === ""}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Payment
                </button>
                <button
                  type="button"
                  onClick={setEmpty}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {paymentMethod === "E-Sewa" && <PaymentGateway amount={amount - shippingFee} shippingFee={shippingFee} TID={TID} />}
      </div>
    )
  };
  
  export default CartComponent;

