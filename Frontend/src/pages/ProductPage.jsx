import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableCellsLarge,
  faBars,
  faXmark
}
  from '@fortawesome/free-solid-svg-icons';
import PriceRangeSlider from "../components/Product/PriceRangeSlider ";
import ProductList from "./ProductList";
import { fetchBrands } from '../services/brandService';
import { fetchCategories } from '../services/categoryService';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../redux/slices/productSlice';

function ProductPage() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const products = useSelector(selectProducts);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const brandsData = await fetchBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };

    getBrands();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    getCategories();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    console.log("All filters cleared");
  };

  return (
    <div className="">
      <div className="w-full px-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-2">
          <div className="w-full lg:col-span-1">
            <div className=" w-full">
              <div className=" mb-4 font-bold text-3xl">
                Products
              </div>
              <div className=" relative p-4">
                <div>
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                  <label className="ml-2 text-black">New</label>
                </div>
                <div>
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                  <label className="ml-2 text-black">2hand</label>
                </div>
              </div>

              <div className="h-px bg-gray-300 my-5 mx-auto"></div>
              <div className="Products text-black font-bold">Categories</div>
              <div className=" relative p-4">
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category, index) => (
                    <label key={index} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-orange-500"
                        value={category.categoryName}
                      />
                      <span className="ml-2 text-black">{category.categoryName}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-300 my-5 mx-auto"></div>

              <div className=" text-black font-bold">Brands</div>
              <div className=" relative p-4">
                <div className="grid grid-cols-1 gap-2">
                  {brands.map((brand, index) => (
                    <label key={index} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-orange-500"
                        value={brand.value}
                      />
                      <span className="ml-2 text-black">{brand.brandName} ({brand.quantity})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-300 my-5 mx-auto"></div>

              <div className=" text-black font-bold">Size</div>

              <div className="relative p-4">
                <div className="grid grid-cols-4 gap-2">
                  {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                    <button
                      key={size}
                      className="bg-transparent border border-black text-black font-bold py-2 px-4 rounded"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px bg-gray-300 my-5 mx-auto"></div>
              <div>
                <div className=" text-black font-bold">Price</div>
                <PriceRangeSlider />
                <div className="h-px bg-gray-300 my-5 mx-auto"></div>

                <div className="flex items-center justify-center mt-4 w-fit">
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center text-black font-bold underline"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                    CLEAR ALL FILTER
                  </button>
                </div>
              </div>

              <div className="relative inline-block mt-6">
                <img src="/assets/images/product/hero.png" alt="Hero" />
                <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center p-[10px]">
                  <span className="text-white font-bold text-xl font-poppins">
                    Get Yours
                  </span>
                  <br />
                  <span className="text-white font-bold text-3xl uppercase font-poppins">
                    Best Gear
                  </span>
                  <br />
                </div>

                <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 p-2">
                  <span className="text-black font-bold">Shop Now</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:col-span-3">
            <div className="py-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="text-sm text-gray-600">
                  Showing of {products.total} results
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">Sort by</span>
                  <select
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="">None</option>
                    <option value="listedprice">Price</option>
                  </select>
                  <div className="ml-4 flex items-center space-x-2">
                    <button>
                      <FontAwesomeIcon icon={faTableCellsLarge} />
                    </button>
                    <Link to="/productv2">
                      <button>
                        <FontAwesomeIcon icon={faBars} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <ProductList sortBy={sortBy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
