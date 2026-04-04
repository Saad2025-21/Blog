import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home'
import Blog from './pages/Blog'
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup'

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /><Footer/></>
  },
 {
    path: '/blog',
    element: <><Navbar /><Blog /><Footer /></>
  },
 {
    path: '/about',
    element: <><Navbar /><About /><Footer /></>
  },
 {
    path: '/login',
    element: <><Navbar /><Login /><Footer /></>
  },
 {
    path: '/signup',
    element: <><Navbar /><Signup /><Footer /></>
  },


])
const App = () => {
  return (
  <RouterProvider router={router} />
  )
}

export default App