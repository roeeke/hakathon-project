import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const NavBar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <Link className="navbar-brand" to="/">Psagot</Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">בית</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={onLogout}>התנתק</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">התחבר</Link>
            </li>
          )}
        </ul>
      </div>
      <style>
        {`
          .navbar-brand:hover,
          .navbar-nav .nav-link:hover {
            color: #bada55;
          }
          .navbar-brand{
            color: white;
          }
          *{
            box-sizing: border-box;
            margin:0;
            padding:0;
          }
          .navbar {
            width: 100%;
            height: 100%;
            --s: 200px; /* control the size */
            --c1: #1d1d1d;
            --c2: #4e4f51;
            --c3: #3c3c3c;
          
            background: repeating-conic-gradient(
                  from 30deg,
                  #0000 0 120deg,
                  var(--c3) 0 180deg
                )
                calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
              repeating-conic-gradient(
                from 30deg,
                var(--c1) 0 60deg,
                var(--c2) 0 120deg,
                var(--c3) 0 180deg
              );
            background-size: var(--s) calc(var(--s) * 0.577);
          }
          .navbar-nav .nav-link {
            color: white; /* Change text color to white */
          }
          
        `}
      </style>
    </nav>
  );
};

export default NavBar;
