import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Landing from "./components/landing/Landing";
import TwoSquareCipherExplanation from './components/Explanation/TwoSquareCipherExplanation';

function App() {

  useEffect(() => {
    document.title = 'Two Square Playfair Cipher';
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/explanation" element={<TwoSquareCipherExplanation />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
