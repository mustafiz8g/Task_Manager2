const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion,ObjectId  } = require("mongodb");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8300;

//  MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nq2rk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let usersCollection;
let tasksCollection; // Tasks collection added

async function connectDB() {
  try {
    // await client.connect();
    const db = client.db("task-manager");
    usersCollection = db.collection("users");
    tasksCollection = db.collection("tasks"); // Initialize tasks collection

    // console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
  }
}
connectDB();

// 🚀 POST - Add User
app.post("/users", async (req, res) => {
  try {
    // console.log("📩 Received user data:", req.body);
    const { name, image, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: " Email is required" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) {
      await usersCollection.insertOne({ name, image, email });
      return res.status(201).json({ message: "✅ User added successfully" });
    }

    res.status(200).json({ message: "ℹ️ User already exists" });
  } catch (error) {
    console.error(" Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// 🔎 GET - Fetch User by Email
app.get("/users/:email", async (req, res) => {
  try {
    // console.log("🔍 Fetching user:", req.params.email);
    const user = await usersCollection.findOne({ email: req.params.email });

    if (user) {
      return res.status(200).json(user);
    }
    res.status(404).json({ error: " User not found" });
  } catch (error) {
    console.error(" Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// 🚀 POST - Add New Task
app.post("/tasks", async (req, res) => {
  try {
    // console.log("📩 Received new task:", req.body);
    const { title, description, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: " User email is required" });
    }
    if (!title || title.length > 50) {
      return res.status(400).json({ error: " Title is required (max 50 chars)" });
    }
    if (description && description.length > 200) {
      return res.status(400).json({ error: " Description max 200 chars" });
    }

    const newTask = {
      title,
      description,
      timestamp: new Date().toISOString(), // Auto-generated timestamp
      category: "todo",
      email,
    };

    await tasksCollection.insertOne(newTask);
    res.status(201).json({ message: "✅ Task added successfully", task: newTask });
  } catch (error) {
    console.error(" Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
});



// 🔎 GET - Fetch Tasks for a Specific User
app.get("/tasks/:email", async (req, res) => {
    try {
    //   console.log("🔍 Fetching tasks for:", req.params.email);
      const email = req.params.email;
  
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
  
      const userTasks = await tasksCollection.find({ email: email }).toArray();
  
      res.status(200).json(userTasks);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });
  
// 🚀 DELETE - Remove a Task


app.delete("/tasks/:id", async (req, res) => {
    try {
        // console.log("🗑️ Deleting task:", req.params.id);
        const taskId = req.params.id;

        // Ensure the ID is a valid MongoDB ObjectId
        if (!ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: "❌ Invalid Task ID" });
        }

        const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "✅ Task deleted successfully" });
        } else {
            res.status(404).json({ error: "❌ Task not found" });
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
});

// 🔎 GET - Fetch Task by ID

app.get("/tasks/id/:id", async (req, res) => {
    try {
        // console.log("🔍 Fetching task by ID:", req.params.id);
        const taskId = req.params.id;

        // Ensure the ID is a valid MongoDB ObjectId
        if (!ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: "❌ Invalid Task ID" });
        }

        const task = await tasksCollection.findOne({ _id: new ObjectId(taskId) });

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: "❌ Task not found" });
        }
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Failed to fetch task" });
    }
});


app.put("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, category } = req.body;

        // Validate the MongoDB ObjectId
        if (!ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: "❌ Invalid Task ID" });
        }

        // Update the task in the database
        const updatedTask = await tasksCollection.updateOne(
            { _id: new ObjectId(taskId) },
            { $set: { title, description, category } }
        );

        // Check if the task was updated
        if (updatedTask.modifiedCount === 1) {
            return res.status(200).json({ message: "✅ Task updated successfully" });
        } else {
            return res.status(404).json({ error: "❌ Task not found or no changes made" });
        }
    } catch (error) {
        console.error("❌ Error updating task:", error);
        return res.status(500).json({ error: "Failed to update task" });
    }
});



// 🌍 Base Route
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running..");
});

// 🎯 Start Server
app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
});
