import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare } from 'lucide-react'
import CommentBox from '@/components/CommentBox'
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { setBlog } from '@/redux/blogSlice'
import { toast } from 'sonner'
import DOMPurify from 'dompurify';


const BlogView = () => {
  const params = useParams()
  const blogId = params.blogId
  const { blog } = useSelector(store => store.blog)
  const { user } = useSelector(store => store.auth)
  const selectedBlog = blog.find(blog => blog._id === blogId)
  const [bloglike, setbloglike] = useState(selectedBlog?.likes.length);
  const { comment } = useSelector(store => store.comment)
  const [liked, setLiked] = useState(selectedBlog?.likes.includes(user?._id) || false);
  const dispatch = useDispatch()
  const clean = DOMPurify.sanitize(selectedBlog?.description)


  const likeOrdislikehandler = async () => {
    try {
      const action = liked ? 'dislike' : 'likes'
      const res = await axios.get(`https://blog-spiy.onrender.com/api/v1/blog/${selectedBlog?._id}/${action}`, { withCredentials: true })
      if (res.data.success) {
        const updatelike = liked ? bloglike - 1 : bloglike + 1
        setbloglike(updatelike)
        setLiked(!liked)

        const updatedblog = blog.map(p =>
          p._id === selectedBlog._id ? {
            ...p,
            likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
          } : p

        )

        toast.success(res.data.message)
        dispatch(setBlog(updatedblog))
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  const TimeFormat = (isodate) => {
    const date = new Date(isodate)
    const options = { date: 'numeric', month: 'long', year: 'numeric' }
    const formatteddate = date.toLocaleDateString('en-GB', options)
    return formatteddate
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <main className='blog-view-page'>
      <div className='blog-breadcrumb max-w-6xl mx-auto'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />


            <BreadcrumbItem>
              <BreadcrumbLink href='/blogs'>
               Blogs   {/* only ONE <a> rendered */}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Blog Header */}
      <header className="blog-view-header">
        <p className="editorial-kicker">Nature · Field notes</p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{selectedBlog?.title}</h1>
        <div className="blog-view-byline flex items-center justify-between flex-wrap gap-4">
          <div className="blog-view-author flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={selectedBlog?.author.photoUrl} alt="Author" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedBlog?.author.firstName} {selectedBlog?.author.lastName}</p>
              <p className="text-sm text-muted-foreground">{selectedBlog?.author.occupation}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Published on
            {TimeFormat(selectedBlog?.createdAt)} • 8 min read</div>
        </div>
      </header>
      {/* Featured Image */}
      <figure className="blog-view-figure">
        <img
          src={selectedBlog?.thumbnail}
          alt={selectedBlog?.title || "Article illustration"}
          width={1000}
          height={500}
          className="w-full object-cover"
        />
        <p className="text-sm text-muted-foreground mt-2 italic">{selectedBlog?.subtitle}</p>
      </figure>
      <article className="blog-view-body" dangerouslySetInnerHTML={{ __html: clean }} />
      <div className="blog-view-afterword">
        {/* Tags */}
        <div className="blog-view-tags flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Web Development</Badge>
          <Badge variant="secondary">JavaScript</Badge>
        </div>
        {/* Engagement */}
        <div className="blog-view-engagement flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={likeOrdislikehandler} className="flex items-center gap-1">
              {
                liked ? <FaHeart size={'24'} className='cursor-pointer text-red-600' /> : <FaRegHeart size={'24'} className='cursor-pointer hover:text-gray-600 text-white' />
              }
              <span>{bloglike}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{comment.length} Comments</span>
            </Button>
          </div>
        </div>
        <div className="blog-view-comments"><CommentBox selectedBlog={selectedBlog} /></div>
      </div>
    </main>
  )
}

export default BlogView