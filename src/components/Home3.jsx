import React, { useContext, useEffect } from 'react'
import Routing from '../utils/Routing'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import Nav from './Nav'
import axios from '../utils/axios'
import { useState } from 'react'

function Home() {
  const [products,setProducts] =  useContext(ProductContext)
  const {search} = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  
  const [filteredProducts,setFilteredProducts] = useState(null);
  const getProductCategory = async () =>{
    try {
      const {data} = await axios.get(`/products/category/${category}`)
      setFilteredProducts(data);
      console.log(data);
      

    } catch (error) {
      console.error(error);
      
    }
  }

useEffect(() => {
  if (!filteredProducts)  setFilteredProducts(products);
  
  if (category != "undefined") getProductCategory();
  
},[category,products])
  
 



  return (
    <div className="w-full h-full ">
    <div className="w-screen h-screen ">
      <div className="flex w-full h-full" >
        <Nav></Nav>
        <div className="rightSec w-full h-full flex flex-wrap p-3 gap-2">
            {
                filteredProducts? (
                    filteredProducts.map((e,i)=>(
                        
          <Link to={`/details/${e.id}`} key={i} className="productCard cursor-pointer w-40 h-fit min-h-90  shadow-lg rounded-md p-2 flex flex-col gap-2 justify-center items-center">
            <div className="imgCon w-[90%] p-1 hover:scale-110">
              <img className="w-full" src={e.image} alt="product" />
              </div>
            <div className="title text-center font-semibold hover:text-blue-500">{e.title}</div>
          
          </Link>
                    ))
                ):(
                    <Loading/>
                )

            }
          
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default Home