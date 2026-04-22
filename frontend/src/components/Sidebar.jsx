import React from 'react'
import { ChartColumnBig, SquareUser } from 'lucide-react'
import { LiaCommentSolid } from "react-icons/lia";
import { NavLink } from 'react-router-dom'
import {  FaRegEdit } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className='hidden md:block  dark:bg-gray-800 border-gray-300 dark:border-gray-600 0 w-60 space-y-5 h-screen z-10 pt-11'>

      <div className='text-center pt-10 px-3 space-y-2'>
        <NavLink to='/dashboard/profile' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <SquareUser />
          <span>Profile</span>
        </NavLink>
        <NavLink to='/dashboard/your-blog' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <ChartColumnBig />
          <span>Your Blogs</span>
        </NavLink>
        <NavLink to='/dashboard/comments' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <LiaCommentSolid />
          <span>Comments</span>
        </NavLink>
        <NavLink to='/dashboard/write-blog' className={({ isActive }) => `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-ful`}>
          <FaRegEdit />
          <span>Create Blog</span>
        </NavLink>
      </div>

    </aside>
  )
}

export default Sidebar