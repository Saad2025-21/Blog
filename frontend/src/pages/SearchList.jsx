import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const SearchList = () => {
    const location = useLocation()
     const {pathname} = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get('q') || ''
    const { blog } = useSelector(store => store.blog)

    const blog_filter = (blog || []).filter((item) => {
        return item.title?.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
            item.category?.toLowerCase() === query.toLowerCase()
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return (
        <div className='pt-32'>
            <div className='max-w-6xl mx-auto'>

                <div className='grid grid-cols-3 gap-7 my-10'>

                    {blog_filter.length > 0 ? (

                        blog_filter.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))

                    ) : (
                        <p className='text-gray-500'>No results found for "{query}"</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchList