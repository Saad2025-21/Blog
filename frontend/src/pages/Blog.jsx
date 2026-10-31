import BlogCard from '@/components/BlogCard'
import React, { useEffect } from 'react'
import api from '@/lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'

const Blog = () => {
  const { blog } = useSelector(store => store.blog)
  const dispatch = useDispatch()
  useEffect(() => {
    const getpublishedblog = async () => {

      try {
        const res = await api.get('/blog/getpublished-blog')
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getpublishedblog()
  }, [dispatch])


  return (
    <main className='editorial-blog-page'>
      <div className='blog-index-heading max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
        <p className="editorial-kicker">From the journal</p>
        <h1 className='text-4xl font-bold text-center'>Latest stories</h1>
        <hr className='blog-index-rule' />

      </div>
      <div className='blog-index-grid max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3'>
        {blog?.map((blog) => {
          return <BlogCard key={blog._id} blog={blog} />
        })}
      </div>
    </main>
  )
}

export default Blog