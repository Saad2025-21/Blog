import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import api from '@/lib/axios'

const Comments = () => {
    const [allcomments, setallcomments] = useState([]);
    const navigate = useNavigate()
    const getTotalcomments = async () => {
        try {
            const res = await api.get('/comment/my-blogs/comments')
            
            if (res.data.success) {
                setallcomments(res.data.comments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // External API request is synchronized through component state.
        getTotalcomments()
    }, []);
    return (
        <main className='dashboard-page comments-page'>
            <div className='dashboard-page-inner'>
                <Card className="dashboard-card comments-card w-full p-5 space-y-2 dark:bg-gray-800">
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
                                allcomments?.map((comment) => (
                                    <TableRow key={comment._id} >
                                        <TableCell className="flex gap-4 items-center">
                                            {comment.postId?.title || "Deleted blog"}
                                        </TableCell>
                                        <TableCell>
                                            {comment.content}
                                        </TableCell>
                                        <TableCell>
                                            {comment.userId?.firstname || "Unknown user"}
                                        </TableCell>
                                        <TableCell className="text-right flex gap-3 items-center justify-center">
                                            <Eye className={`cursor-pointer ${!comment.postId ? 'opacity-40 pointer-events-none' : ''}`} onClick={() => comment.postId && navigate(`/blogs/${comment.postId._id}`)} />
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

export default Comments