import axios from "axios";
import localforage from "localforage";
// import { useRouter } from "next/navigation";

export const register = async (userData) => {
  const res = await axios.post(
    "https://online-course-xejk.onrender.com/users/register",
    userData
  );
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(
    "https://online-course-xejk.onrender.com/users/login",
    userData
  );
  if (res.data) {
    await localforage.setItem("token", res.data);
  }
  return res.data;
};

export const logout = async () => {
  await localforage.removeItem("token");
};

export const getUser = async () => {
  const token = await localforage.getItem("token");
  const res = await axios.get("https://online-course-xejk.onrender.com/users", {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};
