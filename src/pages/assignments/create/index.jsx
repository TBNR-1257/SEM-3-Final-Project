import { useState } from "react";
import { Input, Button, FileInput } from "react-daisyui";
import { useMutation } from "react-query";
import { addAssignment } from "@/pages/api/assignments";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AddAssignmentForm() {
  const [assignment, setAssignment] = useState({});
  const [image, setImage] = useState();
  const { push } = useRouter();

  const onChangeHandler = (e) =>
    setAssignment({ ...assignment, [e.target.name]: e.target.value });

  const imageHandler = (e) => setImage(e.target.files[0]);

  const { mutate } = useMutation(
    ({ assignment, image }) => addAssignment(assignment, image),
    {
      onSuccess: (data) => {
        Swal.fire("Success", data.msg, "success");
        push("/assignments");
      },
      onError: (error) => {
        Swal.fire("Oops...", error.response.data.msg, "error");
      },
    }
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ assignment, image });
  };

  return (
    <div className="py-20">
      <div className="grid grid-cols-12">
        <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
          <div className="my-16 flex justify-center">
            <h1 className="text-3xl ">Create an Assignment</h1>
          </div>
          <form onSubmit={onSubmitHandler} encType="multipart/form-data">
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Assignment Title"
                name="title"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Content"
                name="content"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-4">
              <FileInput
                className="w-full"
                name="image"
                bordered
                onChange={imageHandler}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Video"
                name="video"
                onChange={onChangeHandler}
              />
            </div>
            <Button className="block w-full">Create Assignment</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
