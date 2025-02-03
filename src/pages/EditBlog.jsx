import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateBlog } from "../store/blogSlice";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCoverImageUrl, setCurrentCoverImageUrl] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          if (postData.author !== user.uid) {
            alert("You are not authorized to edit this post.");
            navigate(`/blog/${id}`);
          } else {
            setTitle(postData.title);
            setDescription(postData.description);
            setContent(postData.content);
            setCurrentCoverImageUrl(postData.coverImage);
          }
        }
      }
    };

    fetchPost();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !id) return;
    setIsLoading(true);

    try {
      let coverImageUrl = currentCoverImageUrl;
      if (coverImage) {
        const storageRef = ref(
          storage,
          `covers/${Date.now()}_${coverImage.name}`
        );
        await uploadBytes(storageRef, coverImage);
        coverImageUrl = await getDownloadURL(storageRef);
      }

      const updatedPost = {
        title,
        description,
        content,
        coverImage: coverImageUrl,
      };

      await updateDoc(doc(db, "posts", id), updatedPost);
      dispatch(updateBlog({ id, ...updatedPost }));
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating post: ", error);
      setError("Failed to update post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-blog">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="edit-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="edit-blog-title-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="edit-blog-description-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="edit-blog-content-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            className="edit-blog-file-input"
          />
        </div>
        {currentCoverImageUrl && (
          <div className="form-group">
            <label>Current Cover Image</label>
            <img
              src={currentCoverImageUrl || "/placeholder.svg"}
              alt="Current cover"
              className="current-cover"
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading} className="edit-blog-submit">
          {isLoading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
