import { Button, Modal, Input, FileInput } from "react-daisyui";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateAssignment } from "@/pages/api/assignments";
import Swal from "sweetalert2";

export default function EditAssignment({ visible, setVisible, assignment }) {
  const [updatedAssignment, setUpdatedAssignment] = useState({
    id: assignment._id,
    title: assignment.title,
    content: assignment.content,
    image: assignment.image,
    video: assignment.video,
  });

  const [image, setImage] = useState();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateAssignment, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("assignments");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const onChangeHandler = (e) =>
    setUpdatedAssignment({
      ...updatedAssignment,
      [e.target.name]: e.target.value,
    });

  const imageHandler = (e) => setImage(e.target.files[0]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ updatedAssignment, image });
    setVisible(false);
  };

  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Modal.Header className="font-bold">Edit Assignment</Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Assignment Title"
                name="title"
                onChange={onChangeHandler}
                value={updatedAssignment.title}
              />
            </div>
            <div className="mb-4">
              <Input
                className="w-full"
                placeholder="Content"
                name="content"
                onChange={onChangeHandler}
                value={updatedAssignment.content}
              />
            </div>
            <div>
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
                value={updatedAssignment.video}
              />
            </div>

            <Button
              type="button"
              color="error"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button color="success">Confirm</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
