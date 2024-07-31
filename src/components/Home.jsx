import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
// import axios from "../utils/Axios";

const Home = () => {
  const [products, setProducts] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filteredProducts, setfilteredProducts] = useState(null);
  
  //02:26::00
  // const getproductscategory = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/category/${category}`);
  //     setfilteredProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if(!filteredProducts || category == "undefined") setfilteredProducts(products)
    if (category != "undefined"){
      // getproductscategory();
      setfilteredProducts(products.filter(p => p.category == category))
    } 
  }, [category,products]);

  // console.log(filteredProducts);
  return products ? (
    <>
      <Nav />
      <div className="Main w-[85%] p-10  pt-[5%] flex flex-wrap gap-10 overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              to={`details/${p.id}`}
              key={p.id}
              className="card p-3 border shadow rounded w-[18%] h-[30vh] flex justify-center items-center flex-col"
            >
              <div
                className="hover:scale-110 ease-in-out mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-300 text-xs leading-tight font-semibold tracking-tight">{`${p.title}`}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home
