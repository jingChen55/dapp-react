import { useState } from "react";


const navbar = () => { 

  const [data, setData] = useState(100);
  function push() {
    setData(data + 200);
  }
  return (
    <nav className="w-full flex md:justify-left justify-between p-3 bg-blue-700">
      <div className=""></div>
      <div className="flex "> {data} </div>
      <div className="flex -space-x-1 overflow-hidden border-2 rounded-3xl h-12 w-12">
        <img onClick={push} className="inline-block h-12 w-12 	 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </div>
    </nav>
  )
}
export default navbar;
