import { useContext } from "react";
import { useState, useEffect } from "react";
import {  NavLink, useLocation } from "react-router-dom";
export default function Navbar() {
    const[categories, setCategories] = useState([]);

        useEffect(() => {
            async function fetchProducts() {
                const rawData = await fetch("https://fakestoreapi.com/products/categories");
                const products = await rawData.json();
                setCategories(products);
            }
            fetchProducts();
        }, []);


  let location = useLocation();
  if(location.pathname === "/" || location.pathname === "/login"){
   return ;
  }
   
   return (
      <div className="container-fluid row justify-content-around py-4 bg-light">
          <NavLink to={"/home/"} className="col-sm-6 col-md-4 col-lg-2 btn btn-light border border-white-50" >All</NavLink>
        {
          categories.map((category) => (
              <NavLink to={`/home/category/${category}`} key={category} className="col-sm-6 col-md-4 col-lg-2 btn btn-light border border-white-50"  > {category} </NavLink>
          ))
        }
        <NavLink to={"/home/mycart"} className="col-sm-6 col-md-4 col-lg-2 btn btn-light border border-white-50" >Cart</NavLink>
      </div>
    )  
  
}
