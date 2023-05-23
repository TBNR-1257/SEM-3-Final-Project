export default function Dashboard() {
  return (
    <div className="pb-56">
      <h1 className="flex justify-center my-10 text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex justify-center">
        <a
          href="/assignments"
          className="flex justify-center m-10 p-10 text-xl w-3/6 bg-gradient-to-r from-indigo-600 border-2 border-indigo-800 rounded-box"
        >
          Assignments
        </a>
      </div>
    </div>
  );
}
