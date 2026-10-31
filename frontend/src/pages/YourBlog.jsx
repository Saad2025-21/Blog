import { Card } from '@/components/ui/card'
import React, { useCallback, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import api from '@/lib/axios'
import { setYourBlog } from '@/redux/blogSlice'
import { Edit, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const YourBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { yourblog: blog } = useSelector(store => store.blog)

  const getOwnBlog = useCallback(async () => {
    try {
      const res = await api.get('/blog/get-own-blogs')
      if (res.data.success) {
        dispatch(setYourBlog(res.data.blogs))
      }
    } catch (error) {
      console.log(error);

    }
  }, [dispatch])

  const formatDate = (value) => {
    const date = new Date(value)
    const formatdate = date.toLocaleDateString("en-GB")
    return formatdate
  }

  const deleteBlog = async (id) => {
    try {
      const res = await api.delete(`/blog/${id}/delete-blog`)
      if (res.data.success) {
        const updatedblog = blog.filter((blogitem) => blogitem._id !== id)
        dispatch(setYourBlog(updatedblog))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went error")
    }
  }

  useEffect(() => {
    getOwnBlog()
  }, [getOwnBlog]);
  return (
    <main className='dashboard-page your-blog-page'>
      <div className='dashboard-page-inner'>
        <Card className="dashboard-card your-blog-card w-full p-5 space-y-2 dark:bg-gray-800">

          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader className="overflow-x-auto" >
              <TableRow>
                {/* <TableHead className="w-[100px]">Author</TableHead> */}
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                blog?.map((item) => (
                  <TableRow key={item._id} >
                    <TableCell className="flex gap-4 items-center">
                      <img src={item.thumbnail} className='w-20 rounded-md hidden md:block' />
                      <h1 onClick={() => navigate(`/blogs/${item._id}`)} className='hover:underline cursor-pointer'>{item.title}</h1>
                    </TableCell>
                    <TableCell>
                      {item.category}
                    </TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="text-center">

                      <DropdownMenu>
                        <DropdownMenuTrigger><BsThreeDotsVertical /></DropdownMenuTrigger>
                        <DropdownMenuContent className="w-45">
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}><Edit />Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => deleteBlog(item._id)}><Trash2 />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  )
}

export default YourBlog