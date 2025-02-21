
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
// import { NavLink } from "react-router";

// const ToDo = () => {
//     const { user } = useContext(AuthContext);
//     const queryClient = useQueryClient();
//     const email = user?.email;

//     // Fetch tasks using React Query
//     const { data: tasks = [], isLoading, error } = useQuery({
//         queryKey: ["tasks", email],
//         queryFn: async () => {
//             const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${email}`);
//             return res.data;
//         },
//         enabled: !!email, // Only fetch if email exists
//     });

//     // Mutation to delete task
//     const deleteMutation = useMutation({
//         mutationFn: async (id) => {
//             await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(["tasks", email]); // Refetch tasks after deletion
//         },
//     });



//     if (isLoading) return <p>Loading tasks...</p>;
//     if (error) return <p>Error fetching tasks</p>;

//     return (
//         <div className="container mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">My To-Do List</h2>
//             <div className="">
//                 {tasks.map((task) => (
//                     <div key={task._id} className="card  shadow-md p-4 rounded-lg mb-2">
//                         <h3 className="text-lg font-semibold">{task.title}</h3>
//                         <p className="0">{task.description}</p>
//                         <div className="mt-3 flex justify-between">
//                           <NavLink to={`/editTask/${task._id}`}>

//                           <button
//                                 className="btn btn-warning btn-sm"
                               
//                             >
//                                 Edit
//                             </button>
//                           </NavLink>
//                             <button
//                                 className="btn btn-error btn-sm"
//                                 onClick={() => deleteMutation.mutate(task._id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ToDo;

// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
// import { NavLink } from "react-router";
// import toast from "react-hot-toast";

// const ToDo = () => {
//     const { user } = useContext(AuthContext);
//     const email = user?.email;

//     // Fetch tasks using React Query
//     const { data: tasks = [], isLoading, error, refetch } = useQuery({
//         queryKey: ["tasks", email],
//         queryFn: async () => {
//             const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${email}`);
//             return res.data;
//         },
//         enabled: !!email, // Only fetch if email exists
//     });

//     // Mutation to delete task
//     const deleteMutation = useMutation({
//         mutationFn: async (id) => {
//             await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
//         },
//         onSuccess: () => {
//             toast.success("✅ Task deleted successfully!");
//             refetch(); // Manually refetch tasks
//         },
//         onError: () => {
//             toast.error("❌ Failed to delete task. Please try again.");
//         },
//     });

//     if (isLoading) return <p>Loading tasks...</p>;
//     if (error) return <p>Error fetching tasks</p>;

//     return (
//         <div className="container mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4">My To-Do List</h2>
//             <div className="">
//                 {tasks.map((task) => (
//                     <div key={task._id} className="card shadow-md p-4 rounded-lg mb-2">
//                         <h3 className="text-lg font-semibold">{task.title}</h3>
//                         <p>{task.description}</p>
//                         <div className="mt-3 flex justify-between">
//                             <NavLink to={`/editTask/${task._id}`}>
//                                 <button className="btn btn-warning btn-sm">Edit</button>
//                             </NavLink>
//                             <button
//                                 className="btn btn-error btn-sm"
//                                 onClick={() => deleteMutation.mutate(task._id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ToDo;













import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink } from "react-router";
import toast from "react-hot-toast";

const ToDo = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    // Fetch tasks with category 'todo' using React Query
    const { data: tasks = [], isLoading, error, refetch } = useQuery({
        queryKey: ["tasks", email, "todo"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${email}?category=todo`);
            return res.data;
        },
        enabled: !!email, // Only fetch if email exists
    });

    // Mutation to delete task
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
        },
        onSuccess: () => {
            toast.success("✅ Task deleted successfully!");
            refetch(); // Manually refetch tasks
        },
        onError: () => {
            toast.error("❌ Failed to delete task. Please try again.");
        },
    });

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error fetching tasks</p>;

    const taskss = tasks.filter((task) => task.category === "todo");
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My To-Do List</h2>
            <div className="">
                {taskss.length === 0 ? (
                    <p>No tasks in the To-Do list.</p>
                ) : (
                    taskss.map((task) => (
                        <div key={task._id} className="card shadow-md p-4 rounded-lg mb-2">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <p>{task.description}</p>
                            <div className="mt-3 flex justify-between">
                                <NavLink to={`/editTask/${task._id}`}>
                                    <button className="btn btn-warning btn-sm">Edit</button>
                                </NavLink>
                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => deleteMutation.mutate(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ToDo;
