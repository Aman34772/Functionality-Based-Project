import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom';

const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_category= products && products.reduce((acc, curr)=>[...acc, curr.category],[]);
  // console.log(distinct_category);
  distinct_category = [...new Set(distinct_category)]

  const color =()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }
  
  //1:10:00
  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex pt-5 items-center flex-col">
        <Link
          className="py-2 px-5 border border-blue-200 text-blue-300 rounded "
          to="/create"
        >
          Add New Product
        </Link>
        <hr className=" my-3 w-[80%]" />
        <h1 className="text-2xl w-[80%] mb-3">Catgories Filter</h1>
        <div className=" w-[80%]">

          {distinct_category.map((c,i)=>(
            <Link to={`/?category=${c}`} key={i} className="mb-3 flex items-center capitalize">
            <span style={{background: color()}} className="inline-block w-[15px] h-[15px] bg-blue-100 rounded-full mr-2"></span>
            {c}
          </Link>
          ))}

          
          
        </div>
      </nav>
  )
}

export default Nav