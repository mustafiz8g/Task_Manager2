


import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink } from "react-router";
import toast from "react-hot-toast";

const Finish = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    // Fetch tasks with category 'Finish' using React Query
    const { data: tasks = [], isLoading, error, refetch } = useQuery({
        queryKey: ["tasks", email, "Finish"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${email}?category=Finish`);
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

    const taskss = tasks.filter((task) => task.category === "finished");
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

export default Finish;
