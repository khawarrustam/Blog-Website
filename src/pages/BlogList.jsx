import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    setBlogs(storedBlogs);
  }, []);

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