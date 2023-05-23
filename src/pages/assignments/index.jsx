import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAssignments } from "../api/assignments";
import { getUser } from "../api/users";

export default function AssignmentList(props) {
  const { data } = useQuery("assignments", getAssignments, {
    initialData: props.data,
    refetchOnMount: false,
    revalidateOnMount: true,
  });

  const { data: userCheck } = useQuery("role", () => getUser());

  return (
    <div className="py-10">
      <div className="">
        <h1 className="flex justify-center text-xl">Your Assignments</h1>
      </div>

      {userCheck?.role === "admin" || userCheck?.role === "teacher" ? (
        <div className="flex justify-end mr-20 my-10">
          <button className="btn glass">
            <a href="/assignments/create">Create Assignment</a>
          </button>
        </div>
      ) : null}

      <div className="mx-32 pt-20 pb-40">
        <ul role="list" className="divide-y divide-gray-100">
          {data.map((assignment) => (
            <li
              key={assignment._id}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-lg font-semibold leading-6 text-white-100">
                    {assignment.title}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <a href={`/assignments/${assignment._id}`}>View</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getAssignments();
  return {
    props: { data },
  };
}

/*
    This file should display a list of the assignments 
    but only showing the title and having a button to
    view the assignment
*/
