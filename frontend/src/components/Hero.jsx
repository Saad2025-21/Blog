import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Hero() {
  const { blog } = useSelector((store) => store.blog);
  const featuredBlog = blog?.[0];

  return (
    <section className="editorial-frontpage-hero">
      <div className="editorial-lead">
        <div className="editorial-lead-copy">
          <p className="editorial-kicker"><span aria-hidden="true">★</span> Featured story</p>
          <h2>{featuredBlog?.title || "Featured nature story"}</h2>
          <p className="editorial-deck">
            {featuredBlog?.subtitle || "Explore the latest story from the journal."}
          </p>
          <Link to={featuredBlog ? `/blogs/${featuredBlog._id}` : "/blogs"} className="editorial-read-link">
            Read the story <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="editorial-lead-image">
          {featuredBlog?.thumbnail ? (
            <img src={featuredBlog.thumbnail} alt={featuredBlog.title || "Featured story"} />
          ) : (
            <div className="editorial-image-placeholder" role="img" aria-label="Illustrated nature field notes">
              <span>Field notes<br /><strong>Nature in focus</strong></span>
            </div>
          )}
          {featuredBlog?.category && <span className="image-caption">{featuredBlog.category}</span>}
        </div>
      </div>
    </section>
  );
}