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
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { LiaCommentSolid } from 'react-icons/lia'
import Responsivemenu from './Responsivemenu'

export default function Navbar() {
  const { user } = useSelector(store => store.auth)
  const { theme } = useSelector(store => store.theme)
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openNav, setOpenNav] = useState(false)
  const [searchTerm, setsearchTerm] = useState("");
  const logoutHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.get('https://blog-spiy.onrender.com/api/v1/user/logout', { withCredentials: true })
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

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchterm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchterm)}`)
      setsearchTerm('')
    }
  }
  const toggleNav = () => {
    setOpenNav(!openNav)
  }
  return (
    <div className='py-2 fixed w-full bg-#0000000d  z-50 text-white'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
        {/* logo section */}
        <div className='flex gap-7 items-center'>
          <Link to={'/'}>
            <div className='flex gap-2 items-center'>

              <h1 className='font-light text-xl md:text-4xl'>NatBlog</h1>
            </div>
          </Link>
          <div className='relative hidden md:block rounded-4xl'>
            <Input type="text"
              placeholder="Search"
              className=" bg-transparent w-50 hidden md:block"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className='absolute right-0 top-0 bg-transparent' onClick={handleSearch}><Search /></Button>
          </div>
        </div>
        {/* nav section */}
        <nav className='flex md:gap-7 gap-4 items-center '>
          <ul className='hidden md:flex gap-7 items-center text-[15px] font-extralight'>
            <Link to={'/'} className="cursor-pointer"><li>Home</li></Link>
            <Link to={'/blogs'} className={`cursor-pointer`}><li>Blogs</li></Link>
            <Link to={'/about'} className={`cursor-pointer`}><li>About</li></Link>
            {/* <NavLink to={'/write-blog'} className={`cursor-pointer`}><li>Write a Blog</li></NavLink> */}
          </ul>
          <div className='flex'>
            <Button onClick={() => dispatch(toggletheme())} className="">
              {
                theme === 'light' ? <FaMoon /> : <FaSun />
              }

            </Button>
            {
              user ? <div className="ml-7 flex gap-3 items-center">
                {/* <Link to={'/profile'}> */}
                <DropdownMenu className="">
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.photoUrl} />
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
                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut />
                      <span>Log out</span>

                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* </Link> */}
                <Button className="hidden md:block" onClick={logoutHandler}>Logout</Button>
              </div> : <div className='ml-7 md:flex gap-2 '>
                <Link to={'/login'}><Button>Login</Button></Link>
                <Link className='hidden md:block' to={'/signup'}><Button>Signup</Button></Link>
              </div>
            }
          </div>
          {
            openNav ? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 md:hidden' /> : <HiMenuAlt1 onClick={toggleNav} className='w-7 h-7 md:hidden' />
          }

        </nav>
        <Responsivemenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
}