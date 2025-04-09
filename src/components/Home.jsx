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
  const {search,pathname} = useLocation();
  console.log("search",search);
  console.log("pathname",pathname);
  
  
  let categoryFromURL = "";
  if (search && search.includes('=')) {
     categoryFromURL = decodeURIComponent(search.split('=')[1]);
     console.log(categoryFromURL);
     
  }
  
  const [filteredProducts,setFilteredProducts] = useState(products);
  

const getProductCategory =async () =>{
  try {
    const {data} = await axios.get(`/products/category/${categoryFromURL}`)
    console.log(data);
    console.log("runned");
    
    

      setFilteredProducts(data);
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(() => {
  console.log("useEffect: categoryFromURL =", categoryFromURL); // Add this log
  if (categoryFromURL.length > 0) {
      console.log("runned 2"+ categoryFromURL);
      // getProductCategory();

      setFilteredProducts(products.filter((p)=> p.category == categoryFromURL))
  }

  else{
    console.log("runned 3"+ categoryFromURL);
    
    setFilteredProducts(products);
    console.log(filteredProducts);
    
  }
}, [categoryFromURL,products]);

// console.log(`filteredProducts are`,filteredProducts);


  return (
    <div className="w-full h-full ">
    <div className="w-screen h-screen ">
      <div className="flex w-full h-full" >
      
        <Nav></Nav>
        <div className="rightSec w-full h-full flex flex-col p-3">{
          (
            // search!==''
            search.length>0 || pathname!=='/' 
          )&&(<Link to={'/'} className='p-1 text-red-500 rounded border-red-400 border-2 w-fit' >Home</Link>)
          }        
        <div className='w-full h-full flex flex-wrap gap-2' >
            {
                filteredProducts.length>0? (
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
    
  </div>
  )
}

export default Home