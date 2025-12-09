import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Landing from "./components/Landing/"
import Home from "./components/home";
import SelectedProduct from "./components/selectedProduct";
import Navbar from "./components/Navbar";
import CategoriesedProduct from "./components/CategoriesedProduct";
import {MyCart} from "./components/MyCart" 
import NotFound from "./components/NotFound";
import { createContext, useState } from "react";
import CartDisplay from "./components/CartDisplay";

export default function App() {
  let Cart = createContext([]);
  const[addItem,setAddedItem] = useState([]);
  return (
    <div>
      <BrowserRouter>
      <MyCart.Provider value={{addItem,setAddedItem}} >
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/home/" element={<Home />}/>
          <Route path="/home/:item/:id" element={<SelectedProduct />}/>
          <Route path="/home/category/:category" element={<CategoriesedProduct />}/>
          <Route path="/home/mycart" element={<CartDisplay />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </MyCart.Provider>
      </BrowserRouter>
    </div>
  )
}