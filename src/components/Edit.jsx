import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";

function Edit() {
  const navigate = useNavigate();

  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  // console.log("products", products);

  // console.log(productDetails);

  const editProductHandler =  (id) => {
    axios
      .put(`/products/${id}`, productDetails)
      .then((response) => console.log(response.data));
    console.log(productDetails);
    console.log("products before updation ", products);
    const updatedProductList = products.map((p)=>(
      p.id==id?productDetails:p))

      
    // console.log('new product list is',updatedProductList);
    setProducts(updatedProductList)
    // console.log("products after updation ",products)
    navigate("/");
  };

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id == id);
      if (foundProduct) {
        setProductDetails(foundProduct);
      }
    }
  }, [products, id]);


  const addProductHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-cyan-300 w-screen h-screen flex flex-col justify-center items-center ">
      <Link to="/" className="p-2 border-blue-950 border-2 rounded">
        Home
      </Link>
     {
      productDetails?(
        <form
        action=""
        onSubmit={(e) => {
          addProductHandler(e); //cz wha parameter pass hua h yha bhi hoga yah to niche wala chalao
          // or addProductHandler
        }}
        className="w-2/5 flex flex-col gap-2 "
      >
        <h1 className="text-2xl font-semibold">Product Details</h1>
        <input
          type="url"
          placeholder="image link"
          className="
                border-2 border-black rounded-md w-full p-1"
          onChange={(e) => {
            setProductDetails((productDetails) => ({
              ...productDetails,
              image: e.target.value,
            }));
          }}
          value={productDetails.image}
        />
        <input
          type="text"
          placeholder="Product Name"
          className="
                border-2 border-black rounded-md w-full p-1"
          onChange={(e) => {
            setProductDetails((productDetails) => ({
              ...productDetails,
              title: e.target.value,
            }));
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
              setProductDetails((productDetails) => ({
                ...productDetails,
                category: e.target.value,
              }));
            }}
            value={productDetails.category}
          />
          <input
            type="number"
            placeholder="Price"
            className="
                border-2 border-black rounded-md w-full p-1"
            onChange={(e) => {
              setProductDetails((productDetails) => ({
                ...productDetails,
                price: e.target.value,
              }));
            }}
            value={productDetails.price}
          />
        </div>
        <textarea
          placeholder="Please entr the description"
          className="
                border-2 border-black rounded-md w-full p-1"
          onChange={(e) => {
            setProductDetails((productDetails) => ({
              ...productDetails,
              description: e.target.value,
            }));
          }}
          rows={"6"}
          value={productDetails.description}
        />
        <input
          type="submit"
          onClick={() => editProductHandler(id)}
          className="w-fit p-2 font-semibold text-lime-700 border-lime-600 border-2 rounded"
          value={"Edit PRODUCT"}
        ></input>
      </form>
      ):(<Loading/>)
     }
    </div>
  );
}

export default Edit;
