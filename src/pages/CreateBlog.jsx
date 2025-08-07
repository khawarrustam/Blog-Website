import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '../services/api';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    cover: null
  });
  const [coverPreview, setCoverPreview] = useState(null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG, etc)');
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should not exceed 5MB');
      return;
    }

    setFormData(prev => ({
      ...prev,
      cover: file
    }));
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setError('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      cover: null
    }));
    setCoverPreview(null);
    // Also reset the file input
    const fileInput = document.getElementById('cover');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      setError('Content is required');
      return;
    }

    setIsSaving(true);

    try {
      const result = await createBlog(formData);
      
      // Show success message
      alert('Blog saved successfully!');
      
      // Navigate to blogs list
      navigate('/blogs');
    } catch (error) {
      setError(`Failed to save blog: ${error.message || 'Unknown error'}`);
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
          <label className="form-label">Cover Image</label>
          <div 
            className={`image-upload-area ${dragActive ? 'drag-active' : ''} ${coverPreview ? 'has-image' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!coverPreview ? (
              <>
                <div className="upload-icon">📷</div>
                <p>Drag and drop an image here, or</p>
                <label htmlFor="cover" className="upload-btn">
                  Choose File
                </label>
                <input
                  id="cover"
                  name="cover"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden-input"
                />
                <p className="upload-info">JPEG, PNG, GIF • Max 5MB</p>
              </>
            ) : (
              <div className="image-preview-container">
                <img src={coverPreview} alt="Cover preview" className="image-preview-img" />
                <button 
                  type="button"
                  className="remove-image-btn"
                  onClick={handleRemoveImage}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleEditorChange}
            className="editor"
            theme="snow"
            placeholder="Write your blog post here..."
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