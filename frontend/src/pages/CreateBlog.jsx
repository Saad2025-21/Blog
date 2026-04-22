import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    // const { blog } = useSelector(store => store.blog)
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    const createBlogHandler = async () => {
        try {
           setLoading(true)
            const res = await axios.post('http://localhost:3000/api/v1/blog/create', { title, category }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            if (res.data.success) {
                const blogId = res.data.Blog?._id  
                if (!blogId) {
                    console.error("Blog ID missing in response:", res.data)
                    return
                }
                navigate(`/dashboard/write-blog/${blogId}`)
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-4 md:pr-20 h-screen md:ml-80 pt-20 '>
            <Card className="md:p-10 p-4 dark:bg-gray-800">
                <h1 className='text-2xl font-bold'>Lets create blog</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius necessitatibus fugit vel distinctio architecto, ut ratione rem nobis eaque?</p>
                <div className='mt-10 '>
                    <div>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Your Blog Name" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white dark:bg-gray-700" />
                    </div>
                    <div className='mt-4 mb-5'>
                        <Label>Category</Label>
                        <Select onValueChange={getSelectedCategory}>
                            <SelectTrigger className="w-45 bg-white dark:bg-gray-700">
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
                    <div className='flex gap-2'>
                        <Button className="" disabled={loading} onClick={createBlogHandler}>
                            {
                                loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please wait</> : "Create"
                            }
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CreateBlog