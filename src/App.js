// Imports for Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Imports for Web-Pages
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";

// Imports for Firebase
import auth from './components/Firebase/Auth';
import UserPage from "./pages/UserPage";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/User" element={<UserPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />         
        </Routes>
      </Router>
    </div>
  );
}
/* <Route path="/product/:bookId" element={<ProductPage />} />   */
// need one path here
export default App;
