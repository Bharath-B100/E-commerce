import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from './context/SearchContext';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import SearchResults from './pages/SearchResults';
import "./styles/App.css";
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Router>
              <div className="App">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} /> {/* Keep this one */}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;