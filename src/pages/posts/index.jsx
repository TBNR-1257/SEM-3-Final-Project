import { useQuery } from "react-query";
import { getPosts } from "../api/posts";
import { Card } from "react-daisyui";
import { getUser } from "../api/users";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AssignmentList(props) {
  const { data } = useQuery("posts", getPosts, {
    initialData: props.data,
    refetchOnMount: false,
    revalidateOnMount: true,
  });

  const { data: userCheck } = useQuery("role", () => getUser());

  return (
    <div className="container mx-auto py-16 px-7 bg-gradient-to-r from-cyan-700">
      <div className="flex justify-center mb-20">
        <h1 className="text-3xl underline underline-offset-8">
          Check out the Latest Updates!
        </h1>
      </div>

      {userCheck?.role === "admin" ? (
        <div className="flex justify-end mr-20 my-6">
          <button className="btn glass">
            <Link href="/posts/create">Create Post</Link>
          </button>
        </div>
      ) : null}

      <div>
        <div className="grid sm:grid-cols-3 gap-4">
          {data.map((post) => (
            <div>
              <Card className="border-2 border-slate-600 h-5/6">
                <Card.Image
                  className="w-max h-max "
                  src={`https://online-course-xejk.onrender.com/${post.image.replace(
                    "public",
                    ""
                  )}`}
                  alt={post._id}
                />
                <Card.Body className="bg-gray-600 rounded-xl">
                  <Card.Title tag="h2">{post.title}</Card.Title>
                  {/* <p>{post.content}</p> */}

                  <button className="btn-glass">
                    <Link href={`/posts/${post._id}`}>Read More</Link>
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getPosts();
  return {
    props: { data },
  };
}

// Sideways card

{
  /* <div className="card card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src={`https://online-course-xejk.onrender.com/${post.image.replace("public", "")}`}
      alt={post._id}
    />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{post.title}</h2>
    <p>{post.content}</p>
    <div className="card-actions justify-end">
      <button className="btn-glass">
        <Link href={`/posts/${post._id}`}>Read More</Link>
      </button>
    </div>
  </div>
</div>; */
}
