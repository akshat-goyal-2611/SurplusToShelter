import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar">

        {/* BRAND */}
        <NavLink to="/" className="brand">
          <div className="brand-logo">
            <span>♥</span>
          </div>

          <div className="brand-text">
            <strong>
              Food<span>Rescue</span>
            </strong>
            <small>Surplus to Shelter</small>
          </div>
        </NavLink>


        {/* NAVIGATION */}
        <div className="nav-links">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shelter"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Shelter
          </NavLink>

          <NavLink
            to="/driver"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Driver
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Impact
          </NavLink>

        </div>


        {/* CTA */}
        <NavLink to="/donate" className="navbar-donate">
          <span>＋</span>
          Donate Food
        </NavLink>

      </nav>
    </header>
  );
}

export default Navbar;