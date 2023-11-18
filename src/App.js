import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import TwoSquare from './components/TwoSquare/TwoSquare';
import Explanation from './components/Explanation/Explanation';
import HillCipher from './components/Hill Cipher/HillCipher';

function App() {

  useEffect(() => {
    document.title = 'Cryptography and Network Security';
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/explanation" element={<Explanation />} />
        <Route path="/" element={<TwoSquare />} />
        <Route path="/hill-cipher" element={<HillCipher />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
