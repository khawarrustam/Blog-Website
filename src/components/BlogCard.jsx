import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const strippedText = text.replace(/<[^>]+>/g, '');
    return strippedText.length > maxLength 
      ? strippedText.substring(0, maxLength) + '...' 
      : strippedText;
  };

  return (
    <Link to={`/blogs/${blog.id}`} className="blog-card-link">
      <article className="blog-card">
        <h2 className="blog-card-title">{blog.title}</h2>
        <p className="blog-card-author">By {blog.author}</p>
        <p className="blog-card-preview">
          {truncateText(blog.content, 150)}
        </p>
        <span className="blog-card-read-more">Read More →</span>
      </article>
    </Link>
  );
};

export default BlogCard;