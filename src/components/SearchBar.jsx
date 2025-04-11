import React, { useState, useContext, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { ProductContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [products] = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      // Filter products based on search term
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setMatchedProducts(filtered.slice(0, 5)); // Limit to 5 results
      setShowDropdown(true);
    } else {
      setMatchedProducts([]);
      setShowDropdown(false);
    }
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    navigate(`/details/${productId}`);
    setSearchTerm("");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-start p-2 relative" ref={dropdownRef}>
      <div className="w-full rounded-full p-2 pl-3 bg-zinc-200 flex gap-2 items-center">
        <CiSearch />
        <input
          className="outline-0 w-full bg-transparent"
          placeholder="Search Products Here..."
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Search Results Dropdown */}
      {showDropdown && matchedProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-10 max-h-80 overflow-y-auto mx-2">
          {matchedProducts.map((product) => (
            <div
              key={product.id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 border-b"
              onClick={() => handleProductSelect(product.id)}
            >
              <div className="w-12 h-12 overflow-hidden flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate">{product.title}</span>
                <span className="text-xs text-red-500">₹{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;