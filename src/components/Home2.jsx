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

  console.log(products);
  
  //get anything after localhost:5173 from the search bar everytime page rerender.
  // Get the search parameter
const {search} = useLocation();

// Better handling of URL parameters
let categoryFromURLInString = "";
if (search && search.includes('=')) {
  const categoryFromURL = search.split('=');
  if (categoryFromURL.length > 1 && categoryFromURL[1]) {
    categoryFromURLInString = decodeURIComponent(categoryFromURL[1]);
  }
}
  console.log(categoryFromURLInString);
  let [filteredProducts,setFilteredProducts] = useState(products);

const getProductCategory =async () =>{
  try {
    const {data} = await axios.get(`/products/category/${categoryFromURLInString}`)
    // console.log(data);
    console.log("runned");
    

      setFilteredProducts(data);
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(() => {
  // Only call getProductCategory if there's a valid category
  if (categoryFromURLInString && categoryFromURLInString.length > 0) {
    console.log("runned 2 " + categoryFromURLInString);
    getProductCategory();
  } else {
    // If no category filter, show all products
    setFilteredProducts(products);
  }
}, [categoryFromURLInString, products]);
// console.log(`filteredProducts are`,filteredProducts);


  return (
    <div className="w-full h-full ">
    <div className="w-screen h-screen ">
      <div className="flex w-full h-full" >
        <Nav></Nav>
        <div className="rightSec w-full h-full flex flex-wrap p-3 gap-2">
            {
                filteredProducts.length? (
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