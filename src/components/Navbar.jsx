import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { auth } from "../firebase/config"
// import { signOut } from "firebase/auth"

export const Navbar = () => {
  //   const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //   const handleLogout = async () => {
  //     try {
  //       await signOut(auth)
  //       dispatch(())
  //     } catch (error) {
  //       console.error("Error signing out: ", error)
  //     }
  //   }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Blogify
      </Link>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/create" className="navbar-link">
              Create Blog
            </Link>
            <button  className="navbar-link">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
