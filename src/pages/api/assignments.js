import axios from "axios";
import localforage from "localforage";

export const getAssignments = async () => {
  const res = await axios.get("https://online-course-xejk.onrender.com/assignments");
  return res.data;
};

export const getAssignmentById = async (id) => {
  const res = await axios.get(`https://online-course-xejk.onrender.com/assignments/${id}`);
  return res.data;
};

export const addAssignment = async (assignment, image) => {
  const formData = new FormData();
  formData.append("title", assignment.title);
  formData.append("content", assignment.content);
  formData.append("image", image);
  formData.append("video", assignment.video);

  const res = await axios.post("https://online-course-xejk.onrender.com/assignments", formData, {
    headers: {
      "x-auth-token": await localforage.getItem("token"),
    },
  });
  return res.data;
};

export const updateAssignment = async (assignment) => {
  let formData = new FormData();
  formData.append("title", assignment.updatedAssignment.title);
  formData.append("content", assignment.updatedAssignment.content);
  formData.append("image", assignment.image);
  formData.append("video", assignment.video);

  const token = await localforage.getItem("token");
  const res = await axios.put(
    `https://online-course-xejk.onrender.com/assignments/${assignment.updatedAssignment.id}`,
    formData,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};

export const deleteAssignment = async (id) => {
  const token = await localforage.getItem("token");
  const res = await axios.delete(`https://online-course-xejk.onrender.com/assignments/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};
