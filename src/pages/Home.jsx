import { useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../store/blogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogs?.posts);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchPosts = async () => {
      if (posts.length === 0) {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setBlogs(fetchedPosts));
      }
    };

    fetchPosts();
  }, [dispatch, posts]);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Our Blog</h1>
        <p>Discover interesting stories and insights from our community</p>
      </header>

      {posts.length > 0 ? (
        <div className="blog-list">
          {posts.map((blog) => (
            <div key={blog.id} className="blog-preview">
              <img
                src={blog.coverImage || "/placeholder.svg"}
                alt={blog.title}
                className="blog-cover"
              />
              <div className="blog-preview-content">
                <h2>{blog.title}</h2>
                <p>{blog.description?.substring(0, 100)}...</p>
                <Link to={`/blog/${blog.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-posts">
          <h2>No posts available yet</h2>
          <p>Be the first to share your thoughts with the world!</p>
          {user ? (
            <Link to="/create" className="create-post-button">
              Create Your First Post
            </Link>
          ) : (
            <Link to="/login" className="create-post-button">
              Login to Create a Post
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
