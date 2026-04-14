import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMoon, FaSun, FaRegEdit } from "react-icons/fa"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { toggletheme } from "../redux/themeslice";
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../redux/authslice";
import {
  User,
  ChartColumnBig,
  LogOut,
  Loader2
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger


} from "./ui/dropdown-menu";
import { LiaCommentSolid } from 'react-icons/lia'


export default function Navbar() {
  const { user } = useSelector(store => store.auth)
  const { theme } = useSelector(store => store.theme)
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchterm, setsearchterm] = useState("");
  const logouthandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true })
      if (res.data.success) {
        navigate('/')
        localStorage.removeItem("user")
        dispatch(setUser(null))
        toast.success(res.data.message)

      }
    } catch (error) {
      console.log(error)
      toast.error(error.res.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handlesearch = (e) => {
    e.preventDefault()
    if (searchterm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchterm)}`)
      setsearchterm('')
    }
  }
  return (
    <nav className="bg-white dark:bg-[rgb(16,23,42)] border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 text-gray-800 dark:text-gray-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 dark:bg-white">
          </div>
          <span className="text-gray-900 dark:text-white">
            NatBlog
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center">
          <div className="flex h-9 items-center rounded-md border border-gray-300 bg-gray-100 overflow-hidden">
            <Input
              type="text"
              placeholder="Search"
              value={searchterm}
              className="h-full w-48 border-0 bg-transparent px-3 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => setsearchterm(e.target.value)}
            />
            <button className="flex h-full items-center justify-center bg-gray-900 px-3 hover:bg-gray-700 
            transition-colors" onClick={handlesearch}
              >
              <Search className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <div className="ml-auto flex items-center gap-7">
          <Link
            to="/"
            className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors dark:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors dark:text-gray-200"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors dark:text-gray-200"
          >
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          {/* Dark Mode Toggle */}
          <Button onClick={() => dispatch(toggletheme())} >
            {
              theme === "light" ? <FaMoon /> : <FaSun />
            }

          </Button>
          {
            user ? <div className="ml-7 flex gap-3 items-center ">
              <DropdownMenu className="">
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 dark:bg-gray-800">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                      <User />
                      <span>Profile</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}>
                      <ChartColumnBig />
                      <span>Your Blog</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                      <LiaCommentSolid />
                      <span>Comments</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}>
                      <FaRegEdit />
                      <span>Write Blog</span>

                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logouthandler}>
                    <LogOut />
                    <span>Log out</span>

                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                className="h-9 px-5 text-sm font-medium border-gray-800 text-gray-900 hover:bg-gray-100
                   dark:text-gray-200"
                onClick={logouthandler}
              >
                {
                  loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    </>
                  ) : ("logout")
                }
              </Button>
            </div> : <div className="ml-7 md:flex gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="h-9 px-5 text-sm font-medium border-gray-500 hover:bg-gray-100 text-gray-800
                   dark:text-gray-200 dark:border-white-900"
                >
                  login
                </Button>
              </Link>
              {/* Signup */}
              < Link to="/signup">
                <Button className="h-9 px-5 text-sm font-medium text-white dark:text-black dark:bg-white">
                  Signup
                </Button>
              </Link>
            </div>
          }
        </div>

      </div>
    </nav >
  );
}