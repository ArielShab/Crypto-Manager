import "../CSS/home.css";
import { useAuth } from "../context/auth.context";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  return (
    <div id="main-div" className="d-flex flex-column justify-content-center">
      {user ? (
        <>
          <div id="main-title">
            Welcome {user.firstName[0].toUpperCase() + user.firstName.slice(1)}
          </div>
          <div className="buttons d-flex justify-content-center mt-4">
            <Link to="/favorites">
              <button>Favorites</button>
            </Link>
            <Link to="/signout">
              <button>Sign Out</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div id="main-title">Crypto Manager</div>
          <div className="buttons d-flex justify-content-center mt-4">
            <Link to="/signup">
              <button>Get Started</button>
            </Link>
            <Link to="/signin">
              <button>Login</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
