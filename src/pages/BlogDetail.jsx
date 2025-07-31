import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const foundBlog = blogs.find(b => b.id.toString() === id);
    setBlog(foundBlog);
  }, [id]);

  if (!blog) {
    return <div className="blog-detail">Blog not found</div>;
  }

  return (
    <article className="blog-detail">
      <div className="blog-detail-header">
        <h1>{blog.title}</h1>
        <div className="blog-meta">
          <div className="blog-meta-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>By {blog.author}</span>
          </div>
          <div className="blog-meta-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>
      </div>

      <div 
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="blog-actions">
        <Link to="/blogs" className="blog-back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Blogs
        </Link>
      </div>
    </article>
  );
};

export default BlogDetail;