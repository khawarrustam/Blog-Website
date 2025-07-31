import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/blogs" className="nav-brand">
          BlogApp
        </Link>
        <div className="nav-links">
          <Link
            to="/blogs"
            className={`nav-link ${isActive('/blogs') ? 'active' : ''}`}
          >
            Blogs
          </Link>
          <Link
            to="/create"
            className={`nav-link ${isActive('/create') ? 'active' : ''}`}
          >
            Create Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;