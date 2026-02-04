// src/components/NavBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bc-nav">
      <div className="bc-nav__inner">
        <NavLink to="/" className="bc-nav__brand">
          FutureSkills <span>Computing</span>
        </NavLink>

        <div className="bc-nav__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "bc-nav__link" + (isActive ? " bc-nav__link--active" : "")
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/activities"
            className={({ isActive }) =>
              "bc-nav__link" + (isActive ? " bc-nav__link--active" : "")
            }
          >
            Activities
          </NavLink>

          <NavLink
            to="/units"
            className={({ isActive }) =>
              "bc-nav__link" + (isActive ? " bc-nav__link--active" : "")
            }
          >
            Units
          </NavLink>

          <NavLink
            to="/teachers"
            className={({ isActive }) =>
              "bc-nav__link" + (isActive ? " bc-nav__link--active" : "")
            }
          >
            For teachers
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              "bc-nav__link" + (isActive ? " bc-nav__link--active" : "")
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
