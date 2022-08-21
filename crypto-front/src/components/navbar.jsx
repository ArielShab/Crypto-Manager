import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <span>
            <i className="bi bi-currency-bitcoin"></i> Crypto Manager
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="coins">
                Coins
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="about">
                About
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="favorites">
                  Favorites
                </NavLink>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="signout">
                  Sign Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="signin">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="signup">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
