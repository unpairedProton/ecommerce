import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/ganga.png"




function Nav() {
  const [products, setProducts] = useContext(ProductContext);
  
  
    const { search, pathname } = useLocation();
    console.log("search", search);
    console.log("pathname", pathname);
  
  
    
    let categoryFromURL = "";
    if (search && search.includes("=")) {
      categoryFromURL = decodeURIComponent(search.split("=")[1]);
      console.log(categoryFromURL);
    }


  const category_color = () => {
    return `rgb(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()}`;
  }

  let all_category =
    products && products.reduce((acc, val) => [...acc, val.category], []);
  // console.log(all_category);

  const distinct_category = [...new Set(all_category)];
  // console.log(distinct_category);

  return (
    <div className=" relative w-44 min-h-screen" >
      <div className="w-44 min-h-screen bg-amber-400 " ></div>
      <nav className="fixed top-0 w-44 gap-2 h-full min-h-screen flex flex-col justify-start items-center pt-2  bg-slate-950 text-zinc-200">
        <div className="w-[90%]" >
          <img  className="w-full object-cover object-center" src={logo} alt="" />
        </div>
        <Link to={'/create'} className="p-1.5 rounded-md border-cyan-600 border-1 text-cyan-600">
          Add new Product
        </Link>
        <div className=" w-[90%] h-px  bg-gradient-to-r from-transparent via-cyan-800 to-transparent"></div>
        <div className="text-lg font-semibold">Category Filter</div>
        <ul className="flex flex-col gap-2" >
          {distinct_category.map((cat, i) => {
            return (
              <Link
                to={`?/category=${cat}`} // "?" lgane se new page ni khulta"
                className={`flex justify-start hover:bg-slate-800 ${cat==categoryFromURL?"bg-slate-800":""} rounded px-1.5 py-1 items-center gap-2`} key={i}
              >
                <div className=" w-4 h-4 rounded-full  " style={{backgroundColor:category_color()}}></div>
                <div style={{textTransform:"capitalize"}}  >{cat}</div>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
