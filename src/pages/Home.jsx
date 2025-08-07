import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to ModernBlog</h1>
        <p className="hero-subtitle">Share your thoughts, stories, and ideas with the world.</p>
        <div className="hero-buttons">
          <Link to="/blogs" className="btn btn-primary">
            Read Blogs
          </Link>
          <Link to="/create" className="btn btn-secondary">
            Create a Blog
          </Link>
        </div>
        <div className="hero-pattern"></div>
      </div>
      
      <section className="home-features">
        <div className="section-header">
          <h2>Features</h2>
          <p>Everything you need to create and share amazing content</p>
        </div>
        
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Write & Publish</h3>
            <p>Create beautiful blog posts with our rich text editor and publish them instantly.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🖼️</div>
            <h3>Add Images</h3>
            <p>Upload stunning cover images to make your blog posts stand out.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Enjoy a seamless experience across desktop, tablet, and mobile devices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;