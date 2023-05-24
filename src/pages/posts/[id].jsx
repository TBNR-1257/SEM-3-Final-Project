import { Card, Button, Input } from "react-daisyui";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getPostById, deletePost } from "../api/posts";
import EditPost from "@/components/Modals/EditPost";
import Swal from "sweetalert2";
import { useState } from "react";
import { getUser } from "../api/users";

export default function Post({ id }) {
  const { data, isLoading } = useQuery("postById", () => getPostById(id));
  const { data: userCheck } = useQuery("role", () => getUser());
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deletePost, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const deleteHandler = async (id) => {
    mutate(id);
    window.location.replace("/posts");
  };

  if (isLoading) return <h2>Loading....</h2>;

  return (
    <div className="my-10 flex flex-col justify-center items-center">
      <h1 className="flex justify-center text-3xl">{data.title}</h1>

      <div className="flex justify-center my-10">
        <iframe
          src={data.video}
          className="w-full aspect-video"
          title="Youtube Video"
          allowFullScreen
        />
      </div>

      <p className="flex justify-center text-lg my-10 mx-20">{data.content}</p>

      <div className="h-1/6 w-3/6 my-10">
        <img
          src={`https://online-course-xejk.onrender.com/${data.image.replace(
            "public",
            ""
          )}`}
        />
      </div>

      {userCheck?.role === "admin" ? (
        <div className="flex space-x-6">
          <Button color="warning" onClick={() => setVisible(true)}>
            Edit
          </Button>
          <EditPost visible={visible} setVisible={setVisible} post={data} />
          <Button onClick={() => deleteHandler(data._id)}>Delete</Button>
        </div>
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
