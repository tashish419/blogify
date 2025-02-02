import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, addDoc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import { addBlog } from "../store/blogSlice";
import { db, storage } from "../firebase/config";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

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
    }
  };
  return (
    <div className="create-blog">
      <h2>Create New Blog Post</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <ReactQuill value={content} onChange={setContent} />
        <input type="file" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlog;
