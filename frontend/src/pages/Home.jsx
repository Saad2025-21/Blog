import Hero from '@/components/Hero'
import RecentBlog from '@/components/RecentBlog'
import PopularAuthors from '@/components/PopularAuthors'

const Home = () => {
  return (
    <div >
      <Hero/>
      <RecentBlog/>
      <PopularAuthors/>
    </div>
  )
}

export default Home