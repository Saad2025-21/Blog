import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Hero() {
  const { blog } = useSelector((store) => store.blog);

  return (
    <section className="editorial-frontpage-hero">
      <div className="editorial-lead">
        <div className="editorial-lead-copy">
          <p className="editorial-kicker"><span aria-hidden="true">★</span> Featured story</p>
          <h2>How to Stay Cool While Waiting for Your AC Repair</h2>
          <p className="editorial-deck">
            Simple tips to keep your home comfortable and beat the heat
            while you wait for your technician to arrive.
          </p>
          <Link to="/blog/staying-cool" className="editorial-read-link">
            Read the story <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="editorial-lead-image">
          {blog?.[0]?.thumbnail ? (
            <img src={blog[0].thumbnail} alt={blog[0].title || "Featured story"} />
          ) : (
            <div className="editorial-image-placeholder" role="img" aria-label="Illustrated nature field notes">
              <span>Field notes<br /><strong>Nature in focus</strong></span>
            </div>
          )}
          {blog?.[0]?.category && <span className="image-caption">{blog[0].category}</span>}
        </div>
      </div>
    </section>
  );
}