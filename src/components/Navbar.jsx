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
    <nav>
      <Link to="/" className="navbar-brand">
        Blogify
      </Link>
      <Link to="/">Home</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      {user ? (
        <>
          <Link to="/create">Create Blog</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
