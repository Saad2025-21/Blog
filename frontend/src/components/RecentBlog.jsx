import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { setBlog } from '@/redux/blogSlice';
import axios from 'axios';

const tags = [
  { category: "Animal" },
  { category: "Birds" },
  { category: "Insects" },
  { category: "Plants" },
]

const RecentBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)

  useEffect(() => {
    const getAllPublsihedBlogs = async () => {
      try {
        const res = await axios.get(`https://blog-spiy.onrender.com/api/v1/blog/getpublished-blog`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllPublsihedBlogs()
  }, [])

  const openArticle = (id) => navigate(`/blogs/${id}`)

  const renderStory = (post, index, variant = '') => (
    <article key={post._id || index} className={`journal-story ${variant}`}>
      <button
        type="button"
        onClick={() => openArticle(post._id)}
        className="journal-story-image"
        aria-label={`Read ${post.title}`}
      >
        {post.thumbnail ? <img src={post.thumbnail} alt="" /> : <span className="story-image-empty" />}
      </button>
      <div className="journal-story-copy">
        <div className="journal-story-meta">
          <span>{post.category}</span>
          {post.createdAt && <time>{new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>}
        </div>
        <h3>
          <button type="button" onClick={() => openArticle(post._id)}>{post.title}</button>
        </h3>
        <p>{post.subtitle || post.content}</p>
        <button type="button" onClick={() => openArticle(post._id)} className="editorial-read-link">
          Read article <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )

  return (
    <div className="journal-content">
      <nav className="category-strip" aria-label="Browse categories">
        {tags.map((item, index) => (
          <button
            key={item.category}
            type="button"
            onClick={() => navigate(`/search?q=${item.category}`)}
            className="category-feature"
          >
            <span className="category-feature-icon">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <strong>{item.category}</strong>
              <small>Explore stories <span aria-hidden="true">→</span></small>
            </span>
          </button>
        ))}
      </nav>

      <div className="journal-main-grid">
        <section className="latest-section" aria-labelledby="latest-heading">
          <div className="section-heading">
            <div>
              <p className="editorial-kicker">Fresh from the press</p>
              <h2 id="latest-heading">Latest articles</h2>
            </div>
            <span className="section-rule" />
          </div>
          <div className="latest-list">
            {(blog || []).slice(0, 4).map((post, index) => renderStory(post, index))}
          </div>
        </section>

        <aside className="journal-sidebar">
          <section className="sidebar-block suggested-block">
            <p className="editorial-kicker">A few good reads</p>
            <h2>Suggested blogs</h2>
            <ul className="suggested-list">
              {['The life of lion', 'How do birds fly', 'Plants that glow'].map((title, index) => (
                <li key={title}><span>{String(index + 1).padStart(2, '0')}</span>{title}</li>
              ))}
            </ul>
          </section>

          <section className="sidebar-block newsletter-block">
            <p className="editorial-kicker">The Sunday note</p>
            <h2>Stories worth sharing.</h2>
            <p className="newsletter-copy">Get the latest posts delivered to your inbox.</p>
            <div className="newsletter-form">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm"
              />
              <Button className="newsletter-button">
                Subscribe <span aria-hidden="true">→</span>
              </Button>
            </div>
          </section>
        </aside>
      </div>

      <section className="secondary-stories" aria-labelledby="popular-heading">
        <div className="section-heading">
          <div>
            <p className="editorial-kicker">Reader favorites</p>
            <h2 id="popular-heading">Popular posts</h2>
          </div>
          <span className="section-rule" />
        </div>
        <div className="story-card-grid">
          {(blog || []).slice(0, 3).map((post, index) => renderStory(post, index, 'story-card'))}
        </div>
      </section>

      {(blog || []).length > 3 && (
        <section className="secondary-stories editors-section" aria-labelledby="editors-heading">
          <div className="section-heading">
            <div>
              <p className="editorial-kicker">Handpicked for you</p>
              <h2 id="editors-heading">Editor’s picks</h2>
            </div>
            <span className="section-rule" />
          </div>
          <div className="story-card-grid">
            {(blog || []).slice(3, 6).map((post, index) => renderStory(post, index + 3, 'story-card'))}
          </div>
        </section>
      )}
    </div>
  )
}

export default RecentBlog
