import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMoon } from "react-icons/fa"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";

export default function Navbar() {
  const {user} = useSelector(store => store.auth)
  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900">
          </div>
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            NatBlog
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center">
          <div className="flex h-9 items-center rounded-md border border-gray-300 bg-gray-100 overflow-hidden">
            <Input
              type="text"
              placeholder="Search"
              className="h-full w-48 border-0 bg-transparent px-3 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <button className="flex h-full items-center justify-center bg-gray-900 px-3 hover:bg-gray-700 transition-colors">
              <Search className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <div className="ml-auto flex items-center gap-7">
          <Link
            to="/"
            className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-800 hover:text-gray-500 transition-colors"
          >
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          {/* Dark Mode Toggle */}
          <Button>
            <FaMoon />
          </Button>
          {
            user ? <div className="ml-7 flex gap-3 items-center ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>

              </Avatar>
              <Link to="/logout">
                <Button
                  variant="outline"
                  className="h-9 px-5 text-sm font-medium border-gray-800 text-gray-900 hover:bg-gray-100"
                >
                  Logout
                </Button>
              </Link>
            </div> : <div className="ml-7 md:flex gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="h-9 px-5 text-sm font-medium border-gray-800 text-gray-900 hover:bg-gray-100"
                >
                  Login
                </Button>
              </Link>
              {/* Signup */}
              < Link to="/signup">
                <Button className="h-9 px-5 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700">
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