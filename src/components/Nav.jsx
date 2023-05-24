import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import localforage from "localforage";
import { logout } from "@/pages/api/users";
import Link from "next/link";

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
        <Link className="btn btn-ghost normal-case text-xl" href="/home">
          Rhythm&Blues
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/posts">Posts</Link>
          </li>

          <li>
            {!auth ? (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Sign Up</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/chat">Chatroom</Link>
                <Link onClick={logoutHandler}>Logout</Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
