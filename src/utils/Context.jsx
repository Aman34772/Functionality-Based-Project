import React, { createContext, useEffect, useState } from 'react'
import axios from './Axios';
export const ProductContext = createContext();
const Context = (props) => {
    //50:23
    const[products,setProducts]=useState(JSON.parse(localStorage.getItem("products")) || null);
    // const getproducts = async ()=>{
    //     try{
    //         const {data}= await axios("/products")
    //         setProducts(data);
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
    // useEffect(()=>{
    //     getproducts();
    // },[])
  return <ProductContext.Provider value={[products,setProducts]}>
    {props.children}
  </ProductContext.Provider> 
}

export default Context;