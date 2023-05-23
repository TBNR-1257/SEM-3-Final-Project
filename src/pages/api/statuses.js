import axios from "axios";
import localforage from "localforage";

export const getStatusById = async (id) => {
  const res = await axios.get(`http://localhost:5127/statuses/${id}`, {
    headers: { "x-auth-token": await localforage.getItem("token") },
  });
  return res.data;
};

export const addStatus = async (id) => {
  const res = await axios.post(`http://localhost:5127/statuses/${id}`, null, {
    headers: {
      "x-auth-token": await localforage.getItem("token"),
    },
  });
  return res.data;
};

export const getAllStatusByUser = async () => {
  const res = await axios.get("http://localhost:5127/statuses", {
    headers: {
      "x-auth-token": await localforage.getItem("token"),
    },
  });
  return res.data;
};
