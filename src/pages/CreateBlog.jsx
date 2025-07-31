import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.author.trim()) {
      setError('Author is required');
      return;
    }
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      setError('Content is required');
      return;
    }

    setIsSaving(true);

    try {
      const newBlog = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };

      // Get existing blogs
      const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      
      // Add new blog
      const updatedBlogs = [...existingBlogs, newBlog];
      
      // Save to localStorage
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

      // Show success message
      alert('Blog saved successfully!');
      
      // Navigate to blogs list
      navigate('/blogs');
    } catch (error) {
      setError('Failed to save blog. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Create New Blog</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleEditorChange}
            className="editor"
            theme="snow"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className={`btn ${isSaving ? 'btn-disabled' : 'btn-primary'}`}
          >
            {isSaving ? 'Saving...' : 'Save Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;