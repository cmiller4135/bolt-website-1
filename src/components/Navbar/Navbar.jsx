import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showSolutions, setShowSolutions] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-name">Miller</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <div 
          className="dropdown"
          onMouseEnter={() => setShowSolutions(true)}
          onMouseLeave={() => setShowSolutions(false)}
        >
          <span className="nav-link">Solutions</span>
          {showSolutions && (
            <div className="dropdown-content">
              <Link to="/submenu1">Grok Utilities</Link>
              <Link to="/submenu2">Spanish Conjugations</Link>
              <Link to="/submenu3">Submenu 3</Link>
            </div>
          )}
        </div>
        <Link to="/saas-test1" className="nav-link">SaaS Test 1</Link>
        <Link to="/saas-test2" className="nav-link">SaaS Test 2</Link>
        <Link to="/saas-test3" className="nav-link">SaaS Test 3</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>
      <div className="auth-links">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;