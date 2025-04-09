import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
function Details() {
  const [products, setProducts] = useContext(ProductContext)
  const [product, setProduct] = useState(null)
  const { id } = useParams();

  const navigate=useNavigate()
  

  useEffect(() => {
    // getProduct();
    if (!product) {
        setProduct(products.filter((e,i)=> e.id == id)[0])
        // === nahi lga skte as id from useParam is a string
    }
  }, []);

  const productDeleteHandler =(id)=>{

    const filteredProducts = products.filter(p=>p.id!==id)
    setProducts(filteredProducts)
    localStorage.setItem("products",JSON.stringify(filteredProducts))

    navigate("/")
  }

  var a = false
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
 


  // const {title,price,description,image} = products[id]
  return (
    <div className="w-screen h-screen">
    {product ? (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-wrap p-8 w-[60%] border-2 rounded justify-center items-center gap-10">
                {/* Destructure here, inside the conditional rendering */}
                {product && product.title && (() => {
                    const { title, description, price, image, category } = product;
                    return (
                        <>
                            <div className="imgSec w-35 h-40 object-center object-cover">
                                <img src={image} alt={title} />
                            </div>
                            <div className="textSec w-[60%] flex flex-col gap-2">
                                <h2 className="font-semibold text-xl">{title}</h2>
                                <h2 className="cat1 text-gray-500 text-xs">{category}</h2>
                                <h2 className="text-red-400 text-sm font-semibold">₹ {price}</h2>
                                <p className="">{description}</p>
                                <div className="flex gap-2">
                                
                                {/* edit button */}
                                    <Link to={`/edit/${product.id}`} onClick={()=>peoductEditHandler(id)}  className="btn rounded border-teal-600 border-2 text-teal-600 px-2">
                                        Edit
                                    </Link>


                                     {/* delete button */}
                                    <button onClick={()=>productDeleteHandler(id)}  className="btn rounded border-red-500 border-2 text-red-500 px-2">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    );
                })()}
            </div>
        </div>
    ) : (
        <Loading />
    )}
</div>
  );
}

export default Details;
