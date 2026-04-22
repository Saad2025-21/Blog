import BlogCard from '@/components/BlogCard'
import React, { useEffect } from 'react'
// import LMS from "../assets/LMS.png"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'

export const blogJson = [
  {
    "id": 1,
    "title": "How do Birds fly",
    "author": "Saad Ansari",
    "date": "2026-05-14",
    "content": "a bird pulls its wings down using its strong pectoral (chest) muscles, then pushes them up again with its smaller supracoracoideus (wing) muscles",
    "tags": ["Fly", "Birds", "wing",],
    "category": "Birds",
    // "image": LMS
  },
  {
    "id": 2,
    "title": "Why is the Sky Blue",
    "author": "Ayaan Khan",
    "date": "2026-05-15",
    "content": "the sky appears blue due to scattering of sunlight by the atmosphere, where shorter blue wavelengths are scattered more than others",
    "tags": ["Sky", "Science", "Light"],
    "category": "Nature"
  },
  {
    "id": 3,
    "title": "How do Fish Breathe",
    "author": "Zoya Shaikh",
    "date": "2026-05-16",
    "content": "fish use gills to extract oxygen from water as it passes over thin membranes filled with blood vessels",
    "tags": ["Fish", "Water", "Gills"],
    "category": "Animals"
  },
  {
    "id": 4,
    "title": "What Causes Rain",
    "author": "Rehan Patel",
    "date": "2026-05-17",
    "content": "rain is caused when water vapor in the air cools and condenses into droplets that become heavy enough to fall to the ground",
    "tags": ["Rain", "Weather", "Clouds"],
    "category": "Environment"
  },
  {
    "id": 5,
    "title": "Why do Leaves Change Color",
    "author": "Sara Khan",
    "date": "2026-05-18",
    "content": "leaves change color when chlorophyll breaks down, revealing pigments like carotenoids and anthocyanins",
    "tags": ["Leaves", "Plants", "Seasons"],
    "category": "Plants"
  }
]


const Blog = () => {
  const { blog } = useSelector(store => store.blog)
  const dispatch = useDispatch()
  useEffect(() => {
    const getpublishedblog = async () => {

      try {
        const res = await axios.get('http://localhost:3000/api/v1/blog/getpublished-blog', { withCredentials: true })
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getpublishedblog()
  }, [])


  return (
    <div className='pt-16'>
      <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
        <h1 className='text-4xl font-bold text-center pt-10 '>Our Blogs</h1>
        <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />

      </div>
      <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0'>
        {blog?.map((blog, index) => {
          return <BlogCard key={index} blog={blog} />
        })}
      </div>
    </div>
  )
}

export default Blog