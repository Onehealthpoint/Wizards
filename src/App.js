// Imports for Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Imports for Web-Pages
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import UserPage from "./pages/UserPage";
import CategoryDetailPage from "./components/CategoryPageComponents/CategoryDetailPage";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
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
