import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        alert("Blog not found");
        navigate("/");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        alert("Blog deleted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="blog-post">
      {blog ? (
        <>
          <h1>{blog.title}</h1>
          <img src={blog.coverImage} alt={blog.title} width="400px" className="blog-post-cover" />
          <p>{blog.description}</p>
          {user?.uid === blog.createdBy && (
            <>
              <button onClick={() => navigate(`/edit-blog/${id}`)}>Edit</button>
              <button onClick={handleDelete} style={{ color: "red" }}>
                Delete
              </button>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleBlog;
