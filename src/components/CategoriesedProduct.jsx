import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CategoriesedProduct() {
    const[product, setProduct] = useState([]);

    const categories = useParams() ;
    useEffect(() => {
        async function fetchProducts() {
            const rawData = await fetch("https://fakestoreapi.com/products/");
            const products = await rawData.json();
            let filteredProduct = products.filter((item) => item.category === categories.category)
            setProduct(filteredProduct);
        }
        fetchProducts();
    }, [categories.category]);
  return (
        <div>
            <div className="row">
                {
                product.map((item,index) =>(
                    
                    <Link to={`/home/${item.title}/${item.id}`} key={index} className="card col-sm-6 col-md-4 col-lg-2 d-flex flex-column text-decoration-none ">
                        <div className="container-fluid p-2 ">
                            <img src={item.image} className="card-img-top img-thumbnail image-container bg-light" alt={item.title} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title fw-bold">{item.title}</h5>
                            <p className="card-text">{item.description.slice(0,200)+"..."} </p>
                        </div>
                        <button to={`/home/${item.title}`}className="btn btn-warning py-2 mb-4">See details</button>
                    </Link>
                ))
                }
            </div>
        </div>
  )
}
