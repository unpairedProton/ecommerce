import React, { useContext, useEffect } from "react";
import Routing from "../utils/Routing";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import Nav from "./Nav";
import axios from "../utils/axios";
import { useState } from "react";
import SearchBar from "./SearchBar";
import ListProduct from "./ListProduct";


function Home() {
  const [products, setProducts] = useContext(ProductContext);

  const { search, pathname } = useLocation();
  console.log("search", search);
  console.log("pathname", pathname);

console.log(products);

  const maxtitleLength = 55;
  let categoryFromURL = "";
  if (search && search.includes("=")) {
    categoryFromURL = decodeURIComponent(search.split("=")[1]);
    console.log(categoryFromURL);
  }

  const [filteredProducts, setFilteredProducts] = useState(products);

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => b.rating.rate - a.rating.rate
  );

  // 2. Get the top 4 products using slice()
  const topRated = sortedProducts.slice(0, 4);

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${categoryFromURL}`);
      console.log(data);
      console.log("runned");

      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect: categoryFromURL =", categoryFromURL); // Add this log
    if (categoryFromURL.length > 0) {
      console.log("runned 2" + categoryFromURL);
      // getProductCategory();

      setFilteredProducts(
        products.filter((p) => p.category == categoryFromURL)
      );
    } else {
      console.log("runned 3" + categoryFromURL);

      setFilteredProducts(products);
      console.log(filteredProducts);
    }
  }, [categoryFromURL, products]);

  // console.log(`filteredProducts are`,filteredProducts);

  return (
    <div className="w-full  ">
      <div className=" relative flex w-full h-full ">
        <Nav></Nav>
        <div className="rightSec  overflow-hidden grow h-full">
          <SearchBar></SearchBar>
          <div className=" w-full h-full flex  gap-2 flex-col p-3">
            <div className=" w-full flex justify-between h-[4vw]"  >
              <div className="font-bold text-zinc-400" >Top Rated Products</div>
              {
                // search!==''
                (search.length > 0 || pathname !== "/") && (
                  <Link
                    to={"/"}
                    className="p-1 text-red-500 mr-[2vw] rounded border-red-400 border-2 w-fit h-fit"
                  >
                    Home
                  </Link>
                )
              }
            </div>
            <div className=" productCardSec pb-2  h-full overflow-x-hidden flex flex-nowrap gap-2">
              {topRated.length > 0 ? (
                topRated.map((e, i) => (
                  <Link
                    to={`/details/${e.id}`}
                    key={i}
                    className="productCard shrink-0 cursor-pointer w-[15vw] h-fit min-h-90  shadow-lg rounded-md p-2  flex flex-col gap-2 justify-between items-center"
                  >
                    <div className="imgCon w-[90%] p-1 hover:scale-110">
                      <img
                        className="w-full  h-[15vw] object-contain object-center"
                        src={e.image}
                        alt="product"
                      />
                    </div>
                    <div className="w-full flex flex-col justify-between h-[10vw] ">
                      <div className="title text-start font-semibold hover:text-blue-500">
                        {e.title.length > maxtitleLength
                          ? `${e.title.slice(0, maxtitleLength)}...`
                          : e.title}
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <div className="price text-slate-900 font-bold pb-1">
                          {"₹" + Math.floor(parseFloat(e.price) * 15)}
                        </div>
                        <div className="ratings text-zinc-600 text-sm font-light pb-1">{`${e.rating.rate} Ratings`}</div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <Loading />
              )}
            </div>
            <div className="productListView w-full flex flex-col gap-2">
              <div className="text-xl font-semibold px-2 ">Products</div>
              <hr className="text-zinc-500 py-2 " />

              <div className="w-full px-1 flex py-2  text-zinc-700 text-sm font-bold ">
                <div className="w-6"> S.no. </div>
                <div className="w-[10vw] text-center ">Image</div>
                <div className="text-center w-[10vw]">Title</div>
                <div className="ml-auto w-[8vw]">Price</div>
              </div>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((e, i) => (
                  <ListProduct product={e} key={i} />
                ))
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
