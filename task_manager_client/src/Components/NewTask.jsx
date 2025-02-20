import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const NewTask = () => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length > 50) return toast.error("Title max 50 chars.");
        if (description.length > 200) return toast.error("Description max 200 chars.");

        const newTask = { title, description, timestamp: new Date().toISOString(), category: "todo", email: user?.email };

        try {
            const { status } = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask);
            if (status === 201) {
                toast.success(" Task added successfully!");
                navigate("/", { replace: true });

                setTitle("");
                setDescription("");
                
            }
        } catch {
            toast.error(" Failed to add task.");
        }
    };

    return (
        <div className="max-w-lg mx-auto shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Title (max 50 characters)</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1"
                        maxLength="50"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Description (max 200 characters)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1"
                        maxLength="200"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default NewTask;
