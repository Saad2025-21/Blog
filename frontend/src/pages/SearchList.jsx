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
        <main className='find-page'>
            <div className='find-page-inner'>
                <header className='find-page-heading'>
                    <p className='editorial-kicker'>The Nature Ledger · Search desk</p>
                    <h1>Find a story</h1>
                    <p className='find-page-description'>
                        {query ? <>Stories matching <strong>“{query}”</strong></> : 'Browse stories from the journal.'}
                    </p>
                    <div className='find-page-rule'>
                        <span>{blog_filter.length} {blog_filter.length === 1 ? 'story' : 'stories'}</span>
                    </div>
                </header>

                <div className='find-results'>
                    {blog_filter.length > 0 ? (

                        blog_filter.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))

                    ) : (
                        <p className='find-empty-state'>
                            <span className='editorial-kicker'>Nothing on this page</span>
                            <strong>No stories found{query && <> for “{query}”</>}.</strong>
                            <span>Try another topic or browse the journal for something new.</span>
                        </p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default SearchList