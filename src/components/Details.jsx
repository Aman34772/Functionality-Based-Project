import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useContext(ProductContext);

  const { id } = useParams();
  console.log(id);

  // const getSingleProduct= async ()=>{
  //   try{
  //     const{data} =  await axios.get(`/products/${id}`)
  //     setProduct(data);
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }
    // getSingleProduct();
  }, []);

  const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setProducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    toast.success("Deleted Successfully!")
    navigate(-1);
  };

  //1:02:01
  return product ? (
    <div className="w-[70%] flex gap-10 h-full justify-center items-center m-auto p-[10%]">
      <img
        className="h-[60%] w-[50%] object-contain"
        src={`${product.image}`}
        alt=""
      />
      <div className="content  ">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-500 my-2 font-bold">{product.category}</h3>
        <h2 className="text-md font-semibold opacity-90 text-red-300">$ {product.price}</h2>
        <p className="text-xs font-semibold opacity-70 mb-3">
          {product.description}
        </p>
        <Link
          to={`/edit/${product.id}`}
          className="px-2 py-1 border rounded text-white bg-blue-400 mr-2"
        >
          Edit
        </Link>
        <button
          onClick={() => ProductDeleteHandler(product.id)}
          className="px-2 py-1 border rounded text-white bg-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
