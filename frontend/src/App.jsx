import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Blog from './pages/Blog'
import About from './pages/About'

import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

import CreateBlog from './pages/CreateBlog'
import YourBlog from './pages/YourBlog'
import BlogView from './pages/BlogView'
import Comments from './pages/Comments'
import UpdateBlog from './pages/UpdateBlog'
import ProtectedRoute from './components/ProctectedRoute'
import SearchList from './pages/SearchList'

import Themeprovider from './components/themeprovider'
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /><Footer /></>
  },
  {
    path: "/blogs",
    element: <><Navbar /><Blog /><Footer /></>
  },
  {
    path: "/about",
    element: <><Navbar /><About /><Footer /></>
  },
  {
    path: "/search",
    element: <><Navbar /><SearchList /><Footer /></>
  },
  {
    path: "/blogs/:blogId",
    element: <><Navbar /><ProtectedRoute><BlogView /></ProtectedRoute></>
  },
  {
    path: "/write-blog",
    element: <><Navbar /><CreateBlog /></>
  },

  {
    path: "/profile",
    element: <><Navbar /><Profile /></>
  },
  {
    path: "/dashboard",
    element: <><Navbar /><ProtectedRoute><Dashboard /></ProtectedRoute></>,
    children: [
      {
        path: "write-blog",
        element: <><CreateBlog /></>
      },
      {
        path: "write-blog/:blogId",
        element: <><UpdateBlog /></>
      },
      {
        path: "your-blog",
        element: <YourBlog />
      },
      {
        path: "comments",
        element: <Comments />
      },
      {
        path: "profile",
        element: <Profile />
      },


    ]
  },
  {
    path: "/signup",
    element: <><Navbar /><Signup /></>
  },
  {
    path: "/login",
    element: <><Navbar /><Login /></>
  },
])
const App = () => {
  return (
    <>
      <Themeprovider>
        <RouterProvider router={router} />
      </Themeprovider>
    </>

  )
}

export default App