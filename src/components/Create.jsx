import React, { useContext } from "react";
import { useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate()


    const [products, setProducts] = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const addProductHandler =  (e) => {
          e.preventDefault(); 

          if (
            title.trim().length < 5 ||
            image.trim().length < 5 ||
            category.trim().length < 5 ||
            price.trim().length < 1 ||
            description.trim().length < 5
          ) {
            alert("Each and every input must have filled");
            return;
          }

          const product={
            id:nanoid(),
            title,
            image,
            category,
            price,
            description,
          }
          setProducts([...products,product]);
          localStorage.setItem("products",JSON.stringify([...products,product]))

          console.log(product);
            console.log(products);

            // redirect to homepage
            toast.success("Product Add ho gya Bhai")
            navigate('/')

            
        //   document.querySelector('form').style.display = 'none';
}
  return (
    <div className="bg-cyan-300 w-screen h-screen flex flex-col justify-center items-center ">
        <Link to='/' className="p-2 border-blue-950 border-2 rounded" >Home</Link>
      <form action="" onSubmit={
        (e)=>{addProductHandler(e);//cz wha parameter pass hua h yha bhi hoga yah to niche wala chalao
        // or addProductHandler 

        }} className="w-2/5 flex flex-col gap-2 ">
        <h1 className="text-2xl font-semibold">Product Details</h1>
        <input
          type="url"
          placeholder="image link"
          className="
              border-2 border-black rounded-md w-full p-1"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          value={image}
        />
        <input
          type="text"
          placeholder="Product Name"
          className="
              border-2 border-black rounded-md w-full p-1"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <div className="w-full flex  gap-2">
          <input
            type="text"
            placeholder="Category Name"
            className="
              border-2 border-black rounded-md w-full p-1"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          />
          <input
            type="number"
            placeholder="Price"
            className="
              border-2 border-black rounded-md w-full p-1"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
          />
        </div>
        <textarea
          placeholder="Please entr the description"
          className="
              border-2 border-black rounded-md w-full p-1"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          rows={'6'}
          value={description}
        />
        <input type="submit" className="w-fit p-2 font-semibold text-lime-700 border-lime-600 border-2 rounded" value={'ADD PRODUCT'} >
        </input>
      </form>
    </div>
  );
}

export default Create;
