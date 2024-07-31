import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import {nanoid} from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Create = () => {
  const [products, setProducts]=useContext(ProductContext)
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();
    if(title.trim().length<5 || image.trim().length<5 || category.trim().length<5 || price.trim().length<1 || description.trim().length<5){
      alert("Every field must have atleast four character")
      return;
    }
    const product = {
      id:nanoid(),
        title,image,price,category,description,
    };
    setProducts([...products,product]);
    localStorage.setItem("products",JSON.stringify([...products, product]));
    toast.success("Product Added Successfully!");
    // console.log(products);
    navigate("/")

  };
  return (
    <form onSubmit={AddProductHandler} className="w-full h-screen p-[5%] flex flex-col items-center">
      <h1 className="text-3xl mb-5 w-1/2">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 outline-none"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 outline-none"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 outline-none"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="text"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 outline-none"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        placeholder="enter product description here..."
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 outline-none"
        rows="5"
      ></textarea>
      <div className="w-1/2">
        <button
          type="submit"
          className="py-2 px-5 border border-blue-400 font-semibold active:bg-blue-700 active:text-white text-blue-400 rounded"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
