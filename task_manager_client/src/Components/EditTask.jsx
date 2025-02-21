import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo"); // Default status

    // Fetch the task details when component loads
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/id/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.category); // Set the status from the fetched task data
            } catch (error) {
                toast.error("❌ Failed to fetch task data.");
            }
        };

        fetchTask();
    }, [id]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (title.length > 50) return toast.error("Title max 50 chars.");
        if (description.length > 200) return toast.error("Description max 200 chars.");

        try {
            const { status: responseStatus } = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, { title, description, category: status });

            if (responseStatus === 200) {
                toast.success("✅ Task updated successfully!");
                navigate("/");
            }
        } catch {
            toast.error("❌ Failed to update task.");
        }
    };

    return (
        <div className="max-w-lg mx-auto shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
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

                <div>
                    <label className="block font-medium">Status</label>
                    <select
                        className="select select-accent w-full max-w-xs"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default EditTask;
