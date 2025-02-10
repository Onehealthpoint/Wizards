// Imports for Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Imports for Web-Pages
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FailedPaymentPage from "./pages/FailedPaymentPage";
import SuccessPaymentPage from "./pages/SuccessPaymentPage";
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
          <Route path="/paymentsuccess" element={<SuccessPaymentPage />} />      
          <Route path="/paymentfailure" element={<FailedPaymentPage />} />    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
