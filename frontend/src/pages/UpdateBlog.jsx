import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setBlog } from '@/redux/blogSlice'

const UpdateBlog = () => {
  const editor = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const id = params.blogId
  const { blog } = useSelector(store => store.blog)
  const selectblog = blog.find(blog => blog._id === id)

  const [loading, setLoading] = useState();
  const [content, setcontent] = useState('');
  const [publish, setpublish] = useState();
  const [blogData, setBlogData] = useState({
    title: selectblog?.title,
    subtitle: selectblog?.subtitle,
    description: content,
    category: selectblog?.category,
    thumbnail: selectblog?.thumbnail,
  });
  const [previewThumbnail, setpreviewThumbnail] = useState(selectblog?.thumbnail);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });
      const filedata = new FileReader()
      filedata.onloadend(() => setpreviewThumbnail(filedata.result))
      filedata.readAsDataURL(file)
    }

  }
  const updateBlogHandler = async () => {

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);
    formData.append("file", blogData.thumbnail);
    try {
      setLoading(true)
      const res = await axios.put(`http://localhost:3000/api/v1/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        console.log(blogData);
      }
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }
  const togglepublish = async (action) => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/v1/blog/${id}`, {
        params: {
          action
        },
        withCredentials: true
      })
      if (res.data.success) {
        setpublish(!publish)
        toast.success(res.data.message)
        navigate(`/dashboard/your-blog`)
      }
    } catch (error) {
      console.log(error)
      toast.error("failed to update")
    }
  }
  const deleteblog = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/blog/delete/${id}`, { withCredentials: true })
      if (res.data.success) {
        const updatedblog = blog.filter((blogItem) => blogItem._id !== id)
        dispatch(setBlog(updatedblog))
        toast.success(res.data.message)
        navigate('/dashboard/your-blog')
      }
    } catch (error) {
      console.log(error)
      toast.error("something went error")
    }
  }
  return (
    <div className='pb-10 px-3 pt-20 md:ml-80'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
          <h1 className=' text-4xl font-bold '>Basic Blog Information</h1>
          <p className=''>Make changes to your blogs here. Click publish when you're done.</p>
          <div className="space-x-2">
            <Button onClick={() => togglepublish(selectblog?.isPublished ? "false" : "true")
            }  >
              {selectblog?.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button variant="destructive" onClick={deleteblog}>Remove Course</Button>
          </div>
          <div className='pt-10'>
            <Label>Title</Label>
            <Input type="text" placeholder="Enter a title" name="title" value={blogData.title} onChange={handleChange} className="dark:border-gray-300" />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input type="text" placeholder="Enter a subtitle" name="subtitle" value={blogData.subtitle} onChange={handleChange} className="dark:border-gray-300" />
          </div>
          <div>
            <Label>Description</Label>
            <JoditEditor
              ref={editor}
              value={blogData.description}
              onChange={newContent => setcontent(newContent)}
              className="jodit_toolbar"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select onValueChange={selectCategory} className="dark:border-gray-300">
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Animal">Animal</SelectItem>
                  <SelectItem value="Birds">Birds</SelectItem>
                  <SelectItem value="Insects">Insects</SelectItem>
                  <SelectItem value="Plants">Plants</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Thumbnail</Label>
            <Input
              id='file'
              type='file'
              onChange={selectThumbnail}
              accept='image/*'
              className="w-fit dark:border-gray-300"
            >
              {
                previewThumbnail && (
                  <img src={previewThumbnail}
                    className="w-64 my-2"
                    alt="Course Thumbnail" />
                )
              }
            </Input>
          </div>
          <div className='flex gap-3'>
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button onClick={updateBlogHandler}>
              {
                loading ? "Please Wait" : "Save"
              }
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UpdateBlog