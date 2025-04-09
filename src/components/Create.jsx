import React, { useContext } from "react";
import { useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axios"


function Create() {
  const navigate = useNavigate()


    const [products, setProducts] = useContext(ProductContext);
    const [newProduct,setNewProduct] = useState({
      id:nanoid(),
      title:"",
      image:"",
      category:"",
      price:"",
      description:"",
    })
  // const [title, setTitle] = useState("");
  // const [image, setImage] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");

  const addProductHandler =  (e) => {
          e.preventDefault(); 

          if (
            newProduct.title.trim().length < 5 ||
            newProduct.image.trim().length < 5 ||
            newProduct.category.trim().length < 5 ||
            newProduct.price.trim().length < 1 ||
            newProduct.description.trim().length < 5
          ) {
            alert("Each and every input must have filled");
            return;
          }

           axios.post('/products', newProduct)
           .then(response => console.log(" yey data API ka hai",response.data));
         
          setProducts([...products,newProduct]);
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
            setNewProduct({...newProduct,image:e.target.value});
          }}
          value={newProduct.image}
        />
        <input
          type="text"
          placeholder="Product Name"
          className="
              border-2 border-black rounded-md w-full p-1"
              onChange={(e) => {
                setNewProduct({...newProduct,title:e.target.value});
              }}
              value={newProduct.title}
        />
        <div className="w-full flex  gap-2">
          <input
            type="text"
            placeholder="Category Name"
            className="
              border-2 border-black rounded-md w-full p-1"
              onChange={(e) => {
                setNewProduct({...newProduct,category:e.target.value});
              }}
              value={newProduct.category}
          />
          <input
            type="number"
            placeholder="Price"
            className="
              border-2 border-black rounded-md w-full p-1"
              onChange={(e) => {
                setNewProduct({...newProduct,price:e.target.value});
              }}
              value={newProduct.price}
          />
        </div>
        <textarea
          placeholder="Please entr the description"
          className="
              border-2 border-black rounded-md w-full p-1"
              onChange={(e) => {
                setNewProduct({...newProduct,description:e.target.value});
              }}
              value={newProduct.description}
        />
        <input type="submit" className="w-fit p-2 font-semibold text-lime-700 border-lime-600 border-2 rounded" value={'ADD PRODUCT'} >
        </input>
      </form>
    </div>
  );
}

export default Create;
