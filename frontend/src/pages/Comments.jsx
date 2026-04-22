import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"

const Comments = () => {
    const [allcomments, setallcomments] = useState([]);
    const navigate = useNavigate()
    const getTotalcomments = async () => {
        try {
            const res = await axios.get('https://blog-spiy.onrender.com/api/v1/comment/my-blogs/comments', {
                withCredentials: true
            })
            
            if (res.data.success) {
                setallcomments(res.data.comments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTotalcomments()
    }, []);
    return (
        <div className='pb-10 pt-20 md:ml-80 h-screen'>
            <div className='max-w-6xl mx-auto mt-8 '>
                <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
                    <Table>
                        <TableCaption>A list of your recent comments.</TableCaption>
                        <TableHeader >
                            <TableRow>
                                {/* <TableHead className="w-[100px]">Author</TableHead> */}
                                <TableHead>Blog Title</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                allcomments?.map((comment, index) => (
                                    <TableRow key={index} >
                                        <TableCell className="flex gap-4 items-center">
                                            {comment.postId.title}
                                        </TableCell>
                                        <TableCell>
                                            {comment.content}
                                        </TableCell>
                                        <TableCell>
                                            {comment.userId.firstname}
                                        </TableCell>
                                        <TableCell className="text-right flex gap-3 items-center justify-center">
                                            <Eye className='cursor-pointer' onClick={() => navigate(`/blogs/${comment.postId._id}`)} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}

export default Comments