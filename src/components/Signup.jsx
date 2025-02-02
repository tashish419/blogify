import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";
import { auth } from "../firebase/config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        loginUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      navigate("/");
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="auth-form-links">
          <Link to="/login"> Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
