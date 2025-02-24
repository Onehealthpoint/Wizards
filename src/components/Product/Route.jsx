import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import Product from '../components/Product/Productpage';

const Route = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:bookId" element={<Product />} />
        </Routes>
    </Router>
);

export default Route;
