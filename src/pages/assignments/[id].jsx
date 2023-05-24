import { Button } from "react-daisyui";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAssignmentById, deleteAssignment } from "../api/assignments";
import EditAssignment from "@/components/Modals/EditAssignment";
import { addStatus, getAllStatusByUser, getStatusById } from "../api/statuses";
import Swal from "sweetalert2";
import { useState } from "react";
import { getUser } from "../api/users";

export default function Assignment({ id }) {
  const { data, isLoading } = useQuery("assignmentById", () =>
    getAssignmentById(id)
  );

  const { data: statuses, isLoading: stateLoading } = useQuery(
    "statusByUser",
    () => getAllStatusByUser()
  );

  const { data: userCheck } = useQuery("role", () => getUser());

  const [visible, setVisible] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteAssignment, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("assignments");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const deleteHandler = async (id) => {
    mutate(id);
    window.location.replace("/assignments");
  };

  if (isLoading) return <h2>Loading....</h2>;

  let itExist = statuses?.find((status) => status.assignment === id);

  return (
    <div className="py-12 flex flex-col justify-center items-center">
      <h1 className="flex justify-center text-5xl ">{data.title}</h1>

      <p className="flex justify-center text-lg mx-20 mt-10">{data.content}</p>

      <div className="h-1/6 w-3/6 my-20 flex justify-center">
        <img
          src={`https://online-course-xejk.onrender.com/${data.image.replace(
            "public",
            ""
          )}`}
        />
      </div>

      <div className="flex justify-center my-10">
        <iframe
          src={data.video}
          className="w-full aspect-video"
          title="Youtube Video"
          allowFullScreen
        />
      </div>

      {userCheck?.role === "admin" || userCheck?.role === "teacher" ? (
        <div className="flex space-x-6">
          <Button color="warning" onClick={() => setVisible(true)}>
            Edit
          </Button>
          <EditAssignment
            visible={visible}
            setVisible={setVisible}
            assignment={data}
          />
          <Button onClick={() => deleteHandler(data._id)}>Delete</Button>
        </div>
      ) : null}

      {userCheck?.role === "student" ? (
        <>
          {!stateLoading ? (
            <>
              <Button
                disabled={itExist}
                color="success"
                onClick={() => addStatus(data._id)}
              >
                Submit
              </Button>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
}

/* 
  this file should display the content of one assignment 
  so it should show the title and content
  and the image and video 
*/
