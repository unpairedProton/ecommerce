import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  return (
    <div className="w-full flex justify-start p-2" >
    <div className="w-full rounded-full p-2 pl-3 bg-zinc-200 flex gap-2 items-center ">
      <CiSearch />
      <input
        className="outline-0 w-full"
        placeholder="Search Products Here..."
        type="search"
        name=""
        id=""
      />
    </div>
    </div>
  );
}

export default SearchBar;
