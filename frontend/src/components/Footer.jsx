import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);
  return (
    <footer className='editorial-footer bg-white pt-5 pb-[30px] mx-auto w-full max-w-7xl px-4'>
      <div className='editorial-footer-grid max-w-7xl mx-auto px-11 grid grid-cols-1 md:grid-cols-4 gap-10'>
        {/*  info */}
        <div className='footer-publication'>
          <Link to='/' className='footer-brand flex gap-2 items-center'>
            <span className='footer-brand-mark flex h-8 w-8 items-center justify-center'>
              <span className='h-2 w-2 rounded-full bg-white' />
            </span>
            <h1 className='text-lg font-semibold text-gray-900'>The Nature Ledger</h1>
          </Link>
          <p className='footer-description mt-3 text-sm text-gray-500 leading-relaxed'>Independent stories and curious perspectives on the natural world.</p>
          <p className='footer-contact mt-3 text-sm text-gray-500'>support@blog.com</p>
          <p className='footer-contact text-sm text-gray-500'>(123) 456-7890</p>
        </div>
        {/* customer service link */}
        <div className='footer-links'>
          <h3 className='text-sm font-semibold text-gray-900'>The Journal</h3>
          <ul className='mt-3 text-sm text-gray-500 space-y-2'>
            <li><Link to={'/'} className='hover:text-orange-500 transition-colors'>Home</Link></li>
            <li><Link to={'/blogs'} className='hover:text-orange-500 transition-colors'>Latest stories</Link></li>
            <li><Link to={'/about'} className='hover:text-orange-500 transition-colors'>About us</Link></li>
          </ul>
        </div>
        {/* social media links */}
        <div className='footer-social'>
          <h3 className='text-sm font-semibold text-gray-900'>Follow the story</h3>
          <div className='flex gap-3 mt-3 text-gray-400'>
            <a href='#' className='hover:text-orange-500 transition-colors'><FaFacebook size={16} /></a>
            <a href='#' className='hover:text-orange-500 transition-colors'><FaInstagram size={16} /></a>
            <a href='#' className='hover:text-orange-500 transition-colors'><FaTwitterSquare size={16} /></a>
            <a href='#' className='hover:text-orange-500 transition-colors'><FaPinterest size={16} /></a>
          </div>
        </div>
        {/* newsletter subscription */}
        <div className='footer-newsletter'>
          <h3 className='text-sm font-semibold text-gray-900'>The Sunday note</h3>
          <p className='mt-3 text-sm text-gray-500'>A considered selection of new stories, delivered to your inbox.</p>
          <form action="" className='mt-4 flex'>
            <input
              type="email"
              placeholder='Your email address'
              className='footer-email w-full px-3 py-2 text-sm border border-gray-200 bg-gray-50 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400'
            />
            <button type='submit' className='footer-subscribe bg-orange-500 text-white text-sm px-4 hover:bg-orange-600 transition-colors'>Subscribe</button>
          </form>
        </div>
      </div>
      {/* bottom section */}
      <div className='editorial-footer-bottom mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400'>
        <p>&copy; {new Date().getFullYear()} <span className='text-orange-500'>The Nature Ledger</span>. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer