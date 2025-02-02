import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { logOutUser } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logOutUser());
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Blogify
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/create" className="navbar-link">Create Blog</Link>
            <button onClick={handleLogout} className="navbar-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
