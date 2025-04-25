import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import { toast } from "react-toastify";

function Edit() {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editProductHandler = async (id) => {
    setIsSubmitting(true);
    try {
      // Make the API call but don't wait for it since we know it won't persist
      axios.put(`/products/${id}`, productDetails);
      
      // Update the local state immediately
      const updatedProductList = products.map((p) => 
        p.id == id ? productDetails : p
      );
      
      setProducts(updatedProductList);
      
      // Show success message
      toast.success("Product updated successfully in local state. Note: Changes won't persist on the Fake Store API.");
      
      // Navigate back
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id == id);
      if (foundProduct) {
        setProductDetails(foundProduct);
      } else {
        toast.error("Product not found");
        navigate("/");
      }
    }
  }, [products, id]);

  const addProductHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-slate-800 w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/" className="p-2 border-zinc-50 text-zinc-100 border-2 rounded">
        Home
      </Link>
      {productDetails ? (
        <form
          onSubmit={(e) => {
            addProductHandler(e);
          }}
          className="w-2/5 flex flex-col gap-2"
        >
          <h1 className="text-2xl font-semibold text-zinc-100">
            Product Edit Details
            <span className="text-sm text-yellow-400 ml-2">
              (Note: Changes are local only)
            </span>
          </h1>
          <input
            type="url"
            placeholder="image link"
            className="border-2 border-black rounded-md w-full p-1 bg-zinc-300"
            onChange={(e) => {
              setProductDetails((prev) => ({
                ...prev,
                image: e.target.value,
              }));
            }}
            value={productDetails.image}
          />
          <input
            type="text"
            placeholder="Product Name"
            className="border-2 border-black rounded-md w-full p-1 bg-zinc-300"
            onChange={(e) => {
              setProductDetails((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            value={productDetails.title}
          />
          <div className="w-full flex gap-2">
            <input
              type="text"
              placeholder="Category Name"
              className="border-2 border-black rounded-md w-full p-1 bg-zinc-300"
              onChange={(e) => {
                setProductDetails((prev) => ({
                  ...prev,
                  category: e.target.value,
                }));
              }}
              value={productDetails.category}
            />
            <input
              type="number"
              placeholder="Price"
              className="border-2 border-black rounded-md w-full p-1 bg-zinc-300"
              onChange={(e) => {
                setProductDetails((prev) => ({
                  ...prev,
                  price: e.target.value,
                }));
              }}
              value={productDetails.price}
            />
          </div>
          <textarea
            placeholder="Please enter the description"
            className="border-2 border-black rounded-md w-full p-1 bg-zinc-300"
            onChange={(e) => {
              setProductDetails((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            rows={"6"}
            value={productDetails.description}
          />
          <button
            type="button"
            onClick={() => editProductHandler(id)}
            disabled={isSubmitting}
            className={`w-fit p-2 font-semibold text-zinc-100 border-zinc-100 border-2 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Edit PRODUCT"}
          </button>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Edit;
