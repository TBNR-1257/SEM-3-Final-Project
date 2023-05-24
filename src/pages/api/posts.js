import axios from "axios";
import localforage from "localforage";

export const getPosts = async () => {
  const res = await axios.get("https://online-course-xejk.onrender.com/posts");
  return res.data;
};

export const getPostById = async (id) => {
  const res = await axios.get(
    `https://online-course-xejk.onrender.com/posts/${id}`
  );
  return res.data;
};

export const addPost = async (post, image) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("content", post.content);
  formData.append("image", image);
  formData.append("video", post.video);

  const res = await axios.post(
    "https://online-course-xejk.onrender.com/posts",
    formData,
    {
      headers: {
        "x-auth-token": await localforage.getItem("token"),
      },
    }
  );
  return res.data;
};

export const updatePost = async (post) => {
  let formData = new FormData();
  formData.append("title", post.updatedPost.title);
  formData.append("content", post.updatedPost.content);
  formData.append("image", post.image);
  formData.append("video", post.video);

  const token = await localforage.getItem("token");
  const res = await axios.put(
    `https://online-course-xejk.onrender.com/posts/${post.updatedPost.id}`,
    formData,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};

export const deletePost = async (id) => {
  const token = await localforage.getItem("token");
  const res = await axios.delete(
    `https://online-course-xejk.onrender.com/posts/${id}`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};
