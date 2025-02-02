import { useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../store/blogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blogs?.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      if (posts.length === 0) { // Fetch only if posts are empty
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setBlogs(fetchedPosts)); // Store posts in Redux
      }
    };

    fetchPosts();
  }, [dispatch, posts]);

  return (
    <div className="home">
      <h1>All Blog Posts</h1>
      <div className="blog-list">
        {posts.length > 0 ? (
          posts.map((blog) => (
            <div key={blog.id} className="blog-preview">
              <img src={blog.coverImage} alt={blog.title} width="200px" className="blog-cover"/>
              <h2>{blog.title}</h2>
              <p>{blog.description.substring(0, 100)}...</p>
              <Link to={`/blog/${blog.id}`} className="read-more">Read More</Link>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
