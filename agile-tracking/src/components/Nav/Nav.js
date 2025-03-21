import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Nav.css';

const Nav = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Title Above Navbar */}
      <h1 className="nav-title">Agile Tracking System</h1>

      {/* Navigation Bar */}
      <nav>
        <ul>
          <li>
            <button className="nav-link-button bi bi-speedometer2" onClick={() => navigate('/')}> Dashboard</button>
          </li>
          {user ? (
            <>
              <li>
                <button className="nav-link-button bi bi-person-lines-fill" onClick={() => navigate('/profiles')}> Profiles</button>
              </li>
              <li>
                <button className="nav-link-button " onClick={handleLogout}>Logout <span className='bi bi-box-arrow-right'></span></button>
              </li>
            </>
          ) : (
            <li>
              <button className="nav-link-button bi bi-person" onClick={() => navigate('/login')}> Login</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
