import { useContext, useEffect, useState } from 'react'
import { MyCart } from './MyCart';
import { Link } from 'react-router-dom';

export default function CartDisplay() {
    const[product, setProduct] = useState([]);
    const {addItem , setAddedItem} = useContext(MyCart);
    useEffect(() => {
        async function fetchProducts() {
            const rawData = await fetch("https://fakestoreapi.com/products/");
            const products = await rawData.json();
            let filteredProduct = products.filter((item) => [...addItem].includes(item.id) );
            setProduct(filteredProduct);
        }
        fetchProducts();
    }, []);
    function removeFromCart(index){
        let arrId = [...addItem];
        arrId.splice(index,1);
        setAddedItem(arrId);
    }
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
                        <button className="btn btn-outline-danger" onClick={() => removeFromCart(index)} > Remove from cart </button>
                    </Link>
                ))
                }
            </div>
    </div>
  )
}
