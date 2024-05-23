import Post from "../models/Post.js";
import User from "../models/User.js";

// Create Post
export const createPost = async (req, res) => {
	try {
		// Unpack req.body
		const { userId, description, picturePath } = req.body;

		// Get user
		const user = await User.findById(userId);

		// Create new Post from Post model
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			description,
			picturePath,
			userPicturePath: user.picturePath,
			likes: {},
			comments: [],
		});

		// Save Post
		await newPost.save();
		// Get all posts
		const posts = await Post.find();
		// Return all posts for frontend
		res.status(201).json(posts);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

// Get (all) Feed Posts
export const getFeedPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Get User Posts
export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const posts = await Post.find({ userId });
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Update Post
export const likePost = async (req, res) => {
	try {
    // Get generated post id from url query
		const { id } = req.params;
    // Get current user id from req.body
		const { userId } = req.body;
    // Get relavant post
		const post = await Post.findById(id);

    // Check if user already liked post
		const isLiked = post.likes.get(userId);
		if (isLiked) {
      // If user already liked post, remove like
			post.likes.delete(userId);
		} else {
      // If user has not liked post, add like
			post.likes.set(userId, true);
		}

    // Get newly updated post to send to the frontend
		const updatedPost = await Post.findByIdAndUpdate(
			id,
      // [update] «Object»
			{ likes: post.likes },
      // [options.new=false] «Boolean» if true, return the modified document rather than the original
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
