import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const [products, setProducts] = useContext(ProductContext);
  


  const category_color = () => {
    return `rgb(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()}`;
  }

  let all_category =
    products && products.reduce((acc, val) => [...acc, val.category], []);
  // console.log(all_category);

  const distinct_category = [...new Set(all_category)];
  // console.log(distinct_category);

  return (
    <div>
      <nav className="w-42 bg-zinc-100 gap-2 h-full flex flex-col justify-start items-center pt-2">
        <Link to={'/create'} className="p-1.5 rounded-md border-cyan-600 border-1 text-cyan-600">
          Add new Product
        </Link>
        <div className=" w-[90%] h-px  bg-gradient-to-r from-transparent via-cyan-800 to-transparent"></div>
        <div className="text-lg font-semibold">Category Filter</div>
        <ul>
          {distinct_category.map((cat, i) => {
            return (
              <Link
                to={`?/category=${cat}`} // "?" lgane se new page ni khulta"
                className="flex justify-start items-center gap-1" key={i}
              >
                <div className=" w-4 h-4 rounded-full  " style={{backgroundColor:category_color()}}></div>
                <div>{cat}</div>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
