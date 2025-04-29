import React from "react";
import Checkbox from "./Checkbox";
import { useState } from "react";
const Resposive = () => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div className="w-full relative p-10  min-w-screen h-full min-h-screen  bg-neutral-700 sm:bg-green-700 md:bg-blue-700 lg:bg-amber-400 lg:hover:bg-amber-300 xl:bg-purple-700 2xl:bg-red-700      ">
      <div
        className={`absolute top-0 duration-300 left-0 ${
          !sideBar ? "-translate-x-full" : "translate-x-0"
        } w-40 h-full bg-indigo-600`}
      ></div>
      <div className=" fixed top-4 left-5 w-fit h-fit ">
        <Checkbox func={setSideBar}></Checkbox>
      </div>
    </div>
  );
};

export default Resposive;
