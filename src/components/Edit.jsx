import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title :"",
    description :"",
    image : "",
    price : "",
    category : "",
  });
  const changeHandler =(e)=>{
    
    console.log(e.target.name, e.target.value)
    setProduct({...product, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    setProduct(
      products.filter((p) => p.id == id)
      [0]
    );
    
  }, [id]);
  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Every field must have atleast four character");
      return;
    }
    const pi = products.findIndex((p)=> p.id == id);
    const copyData = [...products];
    copyData[pi]= {...products[pi], ...product}
    // console.log(copyData);
    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.success("Saved Successfully");
    // console.log(products);
    navigate(-1);
  };
  
  return (
    <form
      onSubmit={AddProductHandler}
      className="w-full h-screen p-[5%] flex flex-col items-center"
    >
      <h1 className="text-3xl mb-5 w-1/2">Edit Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 outline-none"
        name="image"
        onChange={changeHandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 outline-none"
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 outline-none"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />
        <input
          type="text"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 outline-none"
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        name="description"
        onChange={changeHandler}
        value={product && product.description}
        placeholder="enter product description here..."
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 outline-none"
        rows="5"
      ></textarea>
      <div className="w-1/2">
        <button
          type="submit"
          className="py-2 px-5 border border-blue-400 font-semibold active:bg-blue-700 active:text-white text-blue-400 rounded"
        >
          Save Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
