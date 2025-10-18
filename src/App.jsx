import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<div style={{padding: '2rem'}}><h1>Products Page</h1></div>} />
            <Route path="/cart" element={<div style={{padding: '2rem'}}><h1>Cart Page</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
