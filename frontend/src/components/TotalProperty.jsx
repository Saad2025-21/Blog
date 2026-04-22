import { BarChart3, Eye, MessageSquare, ThumbsUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'

const TotalProperty = () => {
  const [totalComments, settotalComments] = useState();
  const [totalLikes, settotalLikes] = useState();
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)

  const getOwnblogs = async () => {
    try {
      const res = await axios.get('https://blog-spiy.onrender.com/api.v1/blog/get-own-blogs')
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getTotalcomments = async () => {
    try {
      const res = await axios.get('https://blog-spiy.onrender.com/api.v1/comment/my-blogs/comments', { withCredentials: true })
      if (res.data.success) {
        settotalComments(res.data.totalComments)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getTotallikes = async () => {
    try {
      const res = await axios.get('https://blog-spiy.onrender.com/api/v1/blog/my-blogs/likes', { withCredentials: true })
      if (res.data.success) {
        settotalLikes(res.data.totalLikes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getOwnblogs()
    getTotalcomments()
    getTotallikes()
  }, []);
  const stats = [
    {
      title: "Total Views",
      value: "24.8K",
      icon: Eye,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Blogs",
      value: blog.length,
      icon: BarChart3,
      change: "+4%",
      trend: "up",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: MessageSquare,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: ThumbsUp,
      change: "+7%",
      trend: "up",
    },
  ]
  return (
    <div className='md:p-10 p-4'>
      <div className='flex flex-col md:flex-row justify-around gap-3 md:gap-7'>

        {
          stats.map((stat) => (
            <Card key={stat.title} className="w-full dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

          ))}

      </div>
    </div>
  )
}

export default TotalProperty