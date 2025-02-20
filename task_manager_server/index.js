const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8200;

// ✅ MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nq2rk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let usersCollection; // ✅ Make sure collection is accessible

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("task-manager");
    usersCollection = db.collection("users");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
connectDB();

// ✅ POST - Add User
app.post("/users", async (req, res) => {
  try {
    console.log("📩 Received user data:", req.body);
    const { name, image, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "❌ Email is required" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) {
      await usersCollection.insertOne({ name, image, email });
      return res.status(201).json({ message: "✅ User added successfully" });
    }

    res.status(200).json({ message: "ℹ️ User already exists" });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// ✅ GET - Fetch User by Email
app.get("/users/:email", async (req, res) => {
  try {
    console.log("🔎 Fetching user:", req.params.email);
    const user = await usersCollection.findOne({ email: req.params.email });

    if (user) {
      return res.status(200).json(user);
    }
    res.status(404).json({ error: "❌ User not found" });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

// ✅ Base Route
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
