import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { useParams } from "react-router-dom";

function Details() {
const [products, setProducts] = useContext(ProductContext)
const {id}= useParams()
// const {title,price,description,image} = products[id]
  return (
    <div className="w-screen h-screen  flex justify-center items-center">
      <div className="flex flex-wrap p-8  w-[60%] Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday min-w-120  border-2 rounded justify-center items-center gap-10">
        <div className="imgSec w-35 h-40 object-center object-cover">
          <img
            src={products[id].image}
            alt=""
          />
        </div>
        <div className="textSec w-[60%] flex flex-col gap-2">
          <h2 className="font-semibold text-xl " >{products[id].title}</h2>
          <h2 className="cat1 text-gray-500 text-xs" >{products[id].category}</h2>
          <h2 className=" text-red-400 text-sm font-semibold" >₹ {products[id].price}</h2>
          <p className="" >{products[id].description}</p>
          <div className="flex gap-2" >
          <button className="btn rounded border-teal-600 border-2 text-teal-600 px-2">Edit</button>
          <button className="btn rounded border-red-500 border-2 text-red-500 px-2">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
