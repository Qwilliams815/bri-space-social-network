import express from "express"; // For web server
import cors from "cors"; // For cross-origin resource sharing
import mongoose from "mongoose"; // For MongoDB
import morgan from "morgan"; // For logging
import multer from "multer"; // For uploading files
import Grid from "gridfs-stream"; // For storing files
import bodyParser from "body-parser"; // For parsing request bodies
import helmet from "helmet"; // For security

import path from "path";
import { fileURLToPath } from "url";

// Auth
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

// Dummy data imports
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// Configure middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/assets"); // Files saved from the website will be stored in the public/assets folder
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

// Routes with files (special for multer)
// picture is a key from req.body that gets uploaded when the POST request is made from the frontend
app.post("/auth/register", upload.single("picture"), register); // upload.single('picture') is middleware that runs before register
app.post("/posts", upload.single("picture"), verifyToken, createPost);

// Routes
// app.get("/test", (req, res) => {
// 	console.log("Hello World");
// 	res.status(200).json("Hello from GET");
// });

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Mongoose setup
const PORT = process.env.PORT || 5001;
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () =>
			console.log(`Server Running on Port: http://localhost:${PORT}`)
		);
		// Initial manual data insert
		// User.insertMany(users);
		// Post.insertMany(posts);
	})
	.catch((error) => console.log(error.message));
