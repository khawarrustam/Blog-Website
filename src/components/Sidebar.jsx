import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    // Prevent scroll when sidebar is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeSidebar = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const menuItems = [
    { path: '/blogs', label: 'Blog Home', icon: '🏠' },
    { path: '/blogs', label: 'All Posts', icon: '📚' },
    { path: '/create', label: 'Write Blog', icon: '✍️' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/blogs" className="sidebar-logo" onClick={closeSidebar}>
            BlogApp
          </Link>
          <button 
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close Menu"
          />
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path + item.label}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>© 2025 BlogApp</p>
        </div>
      </aside>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      />
    </>
  );
};

export default Sidebar;