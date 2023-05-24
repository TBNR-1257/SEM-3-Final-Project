import { Input, Button } from "react-daisyui";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api/users";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { push } = useRouter();
  const queryClient = useQueryClient();

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", data);
        queryClient.setQueryData("token", data);
      }
      window.location.replace("/");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <div>
      <div className="mt-20">
        <h1 className="text-3xl underline underline-offset-8 flex justify-center">
          Login
        </h1>
      </div>

      <div className="mt-10">
        <p className="text-lg flex justify-center">
          Type in your credentials here
        </p>
      </div>

      <div className="grid grid-cols-12 my-20">
        <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <Input
                onChange={onChangeHandler}
                className="w-full"
                type="text"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="mb-4">
              <Input
                onChange={onChangeHandler}
                className="w-full"
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <Button className="block w-full">Login</Button>
          </form>
        </div>
      </div>

      <div className="flex justify-center my-10">
        <p>
          Don't have an account? Sign up{" "}
          <Link className="underline underline-offset-8" href="/register">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}
