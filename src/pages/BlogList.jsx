import { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import BlogCard from '../components/BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
        console.error('Error loading blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="blog-list">
      <div className="blog-list-header">
        <h1>My Blog Posts</h1>
      </div>

      {blogs.length === 0 ? (
        <p className="no-blogs">No blogs yet. Create your first blog!</p>
      ) : (
        <div className="blog-grid">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;