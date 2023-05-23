import { Input, Button } from "react-daisyui";
import { useState } from "react";
import Swal from "sweetalert2";
import { register } from "../api/users";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

export default function Register() {
  const [user, setUser] = useState({});
  const { push } = useRouter();

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const { mutate, isLoading } = useMutation(register, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Register Successfully",
        text: data.msg,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go to Login",
      }).then((res) => {
        if (res.isConfirmed) push("/login");
      });
    },
    onError: (err) => {
      Swal.fire("Failed to register", err.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (user.password !== user.password2)
      Swal.fire(
        "Oops...",
        "Password and Confirm Password should match",
        "error"
      );
    mutate(user);
  };
  return (
    <div>
      <div className="flex justify-center my-10">
        <h1 className="text-3xl underline underline-offset-8">
          Register an account
        </h1>
      </div>

      <div className="grid grid-cols-12 py-20">
        <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <Input
                className="w-full"
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                type="text"
                placeholder="Username"
                name="username"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                onChange={onChangeHandler}
              />
            </div>
            <Button className="block w-full">Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
