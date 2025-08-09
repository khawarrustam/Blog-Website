// Use relative path in production (will be proxied by Vercel), direct URL in development
const API_URL = import.meta.env.PROD 
  ? '/api' 
  : 'https://blog-backend-rouge-zeta.vercel.app/api';

/**
 * Clean content to remove characters that might cause database issues
 * @param {string} content - The content to clean
 * @returns {string} - Cleaned content
 */
const cleanContent = (content) => {
  if (!content) return content;
  
  // Remove or replace emojis and other 4-byte UTF-8 characters
  // This regex matches most emojis and other 4-byte UTF-8 characters
  return content
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Remove emojis
    .replace(/[\u{10000}-\u{10FFFF}]/gu, '') // Remove other 4-byte characters
    .trim();
};

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
    return data.data?.blogs || [];
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
    return data.data;
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
    
    // Clean the content to remove problematic characters
    const cleanedTitle = cleanContent(blogData.title);
    const cleanedContent = cleanContent(blogData.content);
    const cleanedAuthor = cleanContent(blogData.author) || 'Anonymous';
    
    console.log('Content cleaned, proceeding with API call...');
    
    // If there's a cover image, try to upload with FormData
    if (blogData.cover && blogData.cover instanceof File) {
      console.log('Attempting to upload blog with image...');
      
      try {
        const formData = new FormData();
        formData.append('title', cleanedTitle);
        formData.append('content', cleanedContent);
        formData.append('author', cleanedAuthor);
        formData.append('cover_image', blogData.cover);

        console.log('Sending request with FormData to:', `${API_URL}/blogs`);
        const response = await fetch(`${API_URL}/blogs`, {
          method: 'POST',
          body: formData,
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('File upload failed:', errorText);
          
          // If file upload fails, try without the image
          console.log('Retrying without image...');
          throw new Error('FILE_UPLOAD_FAILED');
        }

        const data = await response.json();
        console.log('Blog with image created successfully:', data);
        return data.data;
        
      } catch (error) {
        if (error.message === 'FILE_UPLOAD_FAILED') {
          console.log('File upload not supported, creating blog without image...');
          // Fall through to JSON method without image
        } else {
          throw error;
        }
      }
    }
    
    // Use JSON for text-only blogs or as fallback
    const payload = {
      title: cleanedTitle,
      content: cleanedContent,
      author: cleanedAuthor
    };

    console.log('Sending request with JSON to:', `${API_URL}/blogs`);
    const response = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`Server error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Blog created successfully:', data);
    return data.data;
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
