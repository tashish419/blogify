import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import { addBlog } from "../store/blogSlice";
import { db, storage } from "../firebase/config";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    try {
      let coverImageUrl = "";
      if (coverImage) {
        const storageRef = ref(
          storage,
          `covers/${Date.now()}_${coverImage.name}`
        );
        await uploadBytes(storageRef, coverImage);
        coverImageUrl = await getDownloadURL(storageRef);
      }

      const newPost = {
        title,
        description,
        content,
        coverImage: coverImageUrl,
        author: user.uid,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      dispatch(addBlog({ id: docRef.id, ...newPost }));
      navigate("/");
    } catch (error) {
      console.error("Error creating post: ", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="create-blog">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="create-blog-title-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="create-blog-description-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill value={content} onChange={setContent} className="create-blog-content-input"/>
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            id="coverImage"
            type="file"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            className="create-blog-file-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading} className="create-blog-submit">
          {isLoading ? "Creating..." : "Create Post"}
        </button>
        
      </form>
    </div>
  );
};

export default CreateBlog;
