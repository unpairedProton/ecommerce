import React from "react";
import { Link } from "react-router-dom";

function ListProduct({ product }) {
  const maxtitleLength = 60;

  return (
    <Link
      to={`/details/${product.id}`}
      className="w-full rounded-md h-[6vw] p-1 gap-[1vw] shadow-lg  flex justify-start items-center hover:bg-zinc-100"
    >
      <div className="listProductNo w-6 text-center ">{product.id<10?(`0${product.id}`):(product.id)}</div>
      <div className="w-[10vw] h-full flex justify-center items-center " >
        <img
          className="h-full object-center object-cover"
          src={product.image}
          alt=""
        />
      </div>
      <div className="listProductTitle ">
        {product.title.length > maxtitleLength
          ? `${product.title.slice(0, maxtitleLength)}...`
          : product.title}
      </div>
      <div className="listProductPrice ml-auto  w-[8vw] ">
      <div>{"₹" + Math.floor((parseFloat(product.price) * 15))}</div>
      
      </div>
    </Link>
  );
}

export default ListProduct;
