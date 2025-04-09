import React, { createContext, useEffect, useState } from "react";
import axios from "../utils/axios";

export const ProductContext = createContext();
function Context(props) {
    const [products,setProducts]= useState([])

    //convert jSON string to object

    const  getProducts= ()=> {
        
        axios.get('/products/').then((result) => {
          const {data} = result;
          setProducts(data);
          console.log(result.data);
        }).then(()=>{

            console.log(products)
        }
        ).catch((err) => {
          console.log(err);
          
        });
    }

    const getProducts2 = async () => {
        try {
          const { data } = await axios("/products");
          setProducts(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
    const getProducts3 = async () => {
        try {
         const {data} = await axios.get('/products')
         console.log(typeof(data));
         
         localStorage.setItem("products",JSON.stringify(data))
         //convert Object to JSON String


        //  setProducts(localStorage.getItem(products))
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(()=>{
        getProducts2();
        
    },[])

  return <ProductContext.Provider value={[products,setProducts]} >{props.children}</ProductContext.Provider>;
}

export default Context;
