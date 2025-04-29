import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


function ListProduct({ product }) {
  const [winWidth,setWinWidth] = useState(window.innerWidth)

  


  const handleResize = () => {
    setWinWidth(window.innerWidth)
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const maxtitleLength = winWidth<640?25:55;

  return (
    <Link
      to={`/details/${product.id}`}
      className="w-full rounded-md h-[10vw] md:h-[6vw] lg:h-[6vw] p-1 gap-[1vw] shadow-lg  flex justify-start items-center hover:bg-zinc-100"
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
      <div className="listProductPrice text-center ml-auto w-[15vw] md:w-[10vw]  lg:w-[8vw] bg-teal-400">
      <div>{"₹" + Math.floor((parseFloat(product.price) * 15))}</div>
      
      </div>
    </Link>
  );
}

export default ListProduct;
