import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import localforage from "localforage";
import { logout } from "@/pages/api/users";

export default function Nav() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  useEffect(() => {
    const getToken = async () => {
      const token = await localforage.getItem("token");
      if (token) {
        setLoading(false);
        setAuth(token);
      }
    };
    getToken();
  }, []);

  const logoutHandler = () => {
    logout();
    setAuth(false);
    push("/home");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/home">
          Rhythm&Blues
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/posts">Posts</a>
          </li>

          <li>
            {!auth ? (
              <>
                <a href="/login">Login</a>
                <a href="/register">Sign Up</a>
              </>
            ) : (
              <>
                <a href="/dashboard">Dashboard</a>
                <a href="/chat">Chatroom</a>
                <a onClick={logoutHandler}>Logout</a>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
