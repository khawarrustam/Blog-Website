const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Fetch all blog posts
 * @returns {Promise<Array>} Array of blog posts
 */
export const getBlogs = async () => {
  try {
    console.log('Fetching from:', `${API_URL}/blogs`);
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await response.json();
    console.log('Blogs data received:', data);
    return data.blogs || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

/**
 * Fetch a single blog post by ID
 * @param {string|number} id - Blog post ID
 * @returns {Promise<Object>} Blog post data
 */
export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    const data = await response.json();
    return data.blog;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new blog post
 * @param {Object} blogData - Blog data with title, content, and optional cover image
 * @returns {Promise<Object>} Created blog post
 */
export const createBlog = async (blogData) => {
  try {
    console.log('API createBlog called with data:', blogData);
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    
    // Comment out or remove the author part
    // if (blogData.author) {
    //   formData.append('author', blogData.author);
    // }
    
    // Add cover image if it exists
    if (blogData.cover && blogData.cover instanceof File) {
      formData.append('cover', blogData.cover);
      console.log('Adding cover image to form data:', blogData.cover.name);
    }

    // Log form data entries
    for (let [key, value] of formData.entries()) {
      console.log(`Form data entry - ${key}:`, value);
    }

    console.log('Sending request to:', `${API_URL}/blogs`);
    const response = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      body: formData,
      // No headers needed for FormData
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`Server error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Blog created successfully:', data);
    return data.blog;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

/**
 * Delete a blog post by ID
 * @param {string|number} id - Blog post ID to delete
 * @returns {Promise<Object>} Response data
 */
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error);
    throw error;
  }
};
