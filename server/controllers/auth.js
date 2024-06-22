import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
export const register = async (req, res) => {
	try {
		// Unpack req.body
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation,
		} = req.body;

		// bcrypt username and password encryption and hashing
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		// Create new User from req.body data
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000), // Dummy values
			impressions: Math.floor(Math.random() * 10000), // Dummy values
		});
		const savedUser = await newUser.save(); // Save User to DB
		res.status(201).json({ message: "User created successfully" });
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Authentication - Login User
export const login = async (req, res) => {
	try {
		// Unpack req.body
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ msg: "User does not exist." });

		// Check if password matches
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

		// Create token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;

		res.status(200).json({ token, user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
