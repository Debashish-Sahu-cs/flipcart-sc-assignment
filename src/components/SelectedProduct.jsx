import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyCart } from "./MyCart";

export default function SelectedProduct() {
    const[product, setProduct] = useState([]);
    const {addItem,setAddedItem} = useContext(MyCart);
    
    const productTitle = useParams();
        useEffect(() => {
            async function fetchProducts() {
                const rawData = await fetch("https://fakestoreapi.com/products/");
                const products = await rawData.json();
                let filteredProduct = [];
                products.map((item ) =>{
                    if( item.id == productTitle.id ){
                        filteredProduct = [item] ;
                    }
                });
                setProduct(filteredProduct);
            }
            fetchProducts();
        }, []);
    
        function addItemToCart(id){
            let arrId = [...addItem];
            arrId.push(id);
            setAddedItem(arrId);
        }
  return (
    <div>
        <div className="container-fluid d-flex justify-content-end px-4">
            <Link to={`/home/`}  className="btn btn-light border border-white-50 ">Back</Link>
        </div>
        {
            product.map((item,index) => (
                <div key={index} className="container-fluid p-2">
                    <div className="container-fluid row p-sm-0 p-md-2 p-lg-4">
                        <div className="col-sm-12 col-md-6 col-lg-6 container-fluid d-flex justify-content-center border border-success rounded bg-light">
                            <img src={item.image} alt={item.title} className="img-fluid p-2" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <h1 className="text-start text-larger fs-xl fw-bolder mt-2"> {item.title} </h1>
                            <div className="d-flex gap-2 my-3">
                                <div className="badge text-bg-success fs-6 ">
                                    {item.rating.rate}
                                </div>
                                <div className="text-secondary"> {item.rating.count} ratings </div>
                            </div>
                            <div className="fs-1 text-dark fw-bolder"> ${item.price} </div>
                            <div className="fs-6 text-dark py-2">
                                -{item.description}
                                <br />
                                -{item.description}
                                <br />
                                -{item.description}
                                <br />
                                -{item.description}
                            </div>
                            <div className="btn-group my-2 gap-2">
                                <button className="btn btn-outline-warning fs-4 px-4 rounded fw-bold" onClick={() => addItemToCart(item.id)} >Add To Cart</button>
                                <button className="btn btn-warning fs-4 px-4 rounded fw-bold">Buy Now </button>
                            </div>
                        </div>
                    </div>
                </div>  
            ))
        }
    </div>
  )
}
