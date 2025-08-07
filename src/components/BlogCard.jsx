import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const strippedText = text.replace(/<[^>]+>/g, '');
    return strippedText.length > maxLength 
      ? strippedText.substring(0, maxLength) + '...' 
      : strippedText;
  };

  const hasCover = blog.cover_image && blog.cover_image !== 'null';
  
  // Format date
  const formattedDate = blog.created_at 
    ? new Date(blog.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Recent';

  return (
    <Link to={`/blogs/${blog.id}`} className="blog-card-link">
      <article className={`blog-card ${hasCover ? 'blog-card-with-image' : ''}`}>
        {hasCover && (
          <div className="blog-card-cover">
            <img 
              src={blog.cover_image} 
              alt={blog.title}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
              }}
            />
          </div>
        )}
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <span className="blog-card-date">{formattedDate}</span>
          </div>
          <h2 className="blog-card-title">{blog.title}</h2>
          <p className="blog-card-author">By {blog.author || 'Anonymous'}</p>
          <p className="blog-card-preview">
            {truncateText(blog.content, 150)}
          </p>
          <span className="blog-card-read-more">Read More →</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;