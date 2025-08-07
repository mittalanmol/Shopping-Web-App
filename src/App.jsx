import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Categories from "./components/Categories";
import CategoryProducts from "./components/CategoryProducts";
import Header from "./components/Header";
import Bag from "./components/Bag";

function App() {
  return (
    <>
      <Header /> {/*  it will display everytime no matter what the routing is*/}
      <Routes>
        <Route path='/' element={<Categories />} />
        <Route path='/:category' element={<CategoryProducts />} />
        <Route path='/bag' element={<Bag />} />
      </Routes>
    </>
  );
}

export default App;
