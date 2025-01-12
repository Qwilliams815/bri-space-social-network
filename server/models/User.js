import mongoose from "mongoose";

// Creating an Mongoose Model
const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 20,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 20,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		picturePath: {
			type: String,
			default: "",
		},
		bannerPath: {
			type: String,
			default: "",
		},
		friends: {
			type: Array,
			default: [],
		},
		location: String,
		occupation: String,
		viewedProfile: Number,
		impressions: Number,
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
