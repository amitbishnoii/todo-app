import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-slate-800 p-3">
        <div className="logo">
            <span className="text-xl font-xl">Todo App</span>
        </div>
        <ul className="flex gap-3.5 mx-4">
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Tasks</li>
            <a href="https://github.com/amitbishnoii"><li className='cursor-pointer hover:font-bold transition-all duration-200'>Github</li></a>
        </ul>
    </nav>
  )
}

export default Navbar