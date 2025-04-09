import React, { useContext } from "react";
import { useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
  const navigate = useNavigate()
  
  const [products, setProducts] = useContext(ProductContext);
  const {id} = useParams()
  const [productDetails,setProductDetails] = useState(products.filter(p=>p.id==id)[0]);

  const editProductHandler = (id)=>{
const updatedProducts=    products.map((p,i)=>(
    p.id==id?productDetails:p
    ))

    
    // console.log(productDetails);
    console.log("products before updation ",products);
    
    console.log('new product list is',updatedProducts);
    setProducts(updatedProducts)
    console.log("products after updation ",products);
    localStorage.setItem("products",JSON.stringify(updatedProducts))
    navigate("/")
  }
  

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const addProductHandler =  (e) => {
          e.preventDefault(); 

          // if (
          //   title.trim().length < 5 ||
          //   image.trim().length < 5 ||
          //   category.trim().length < 5 ||
          //   price.trim().length < 1 ||
          //   description.trim().length < 5
          // ) {
          //   alert("Each and every input must have filled");
          //   return;
          // }

          // const product={
          //   id:nanoid(),
          //   title,
          //   image,
          //   category,
          //   price,
          //   description,
          // }
          // setProducts([...products,product]);
          // localStorage.setItem("products",JSON.stringify([...products,product]))

          // console.log(product);
          //   console.log(products);

          //   // redirect to homepage
          //   navigate('/')
 
        }

  // const {title,price,description,image} = products[id]
  return ( <div className="bg-cyan-300 w-screen h-screen flex flex-col justify-center items-center ">
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
                  setProductDetails(productDetails=>({...productDetails, image: e.target.value}));
                }}
            value={productDetails.image}
          />
          <input
            type="text"
            placeholder="Product Name"
            className="
                border-2 border-black rounded-md w-full p-1"
            onChange={(e) => {
              setProductDetails(productDetails=>({...productDetails,title:e.target.value}))
            }}
            value={productDetails.title}
          />
          <div className="w-full flex  gap-2">
            <input
              type="text"
              placeholder="Category Name"
              className="
                border-2 border-black rounded-md w-full p-1"
                onChange={(e) => {
                  setProductDetails(productDetails=>({...productDetails,category:e.target.value}))
                }}
              value={productDetails.category}
            />
            <input
              type="number"
              placeholder="Price"
              className="
                border-2 border-black rounded-md w-full p-1"
                onChange={(e) => {
                  setProductDetails(productDetails=>({...productDetails,price:e.target.value}))
                }}
              value={productDetails.price}
            />
          </div>
          <textarea
            placeholder="Please entr the description"
            className="
                border-2 border-black rounded-md w-full p-1"
                onChange={(e) => {
                  setProductDetails(productDetails=>({...productDetails,description:e.target.value}))
                }}
            rows={'6'}
            value={productDetails.description}
          />
          <input type="submit"  onClick={()=>(editProductHandler(id))}  className="w-fit p-2 font-semibold text-lime-700 border-lime-600 border-2 rounded" value={'Edit PRODUCT'} >
          </input>
        </form>
      </div>);
}


export default Edit
