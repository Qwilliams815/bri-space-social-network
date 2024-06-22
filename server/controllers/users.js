import User from "../models/User.js";

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);

		res.status(200).json(formattedFriends);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);

		// Find friend
		const friend = await User.findById(friendId);

		// If already friends, Remove friend
		if (user.friends.includes(friendId)) {
			// Remove friend from users friends
			user.friends = user.friends.filter((id) => id !== friendId);
			// Remove user from friend's friends
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			// Add friend to users friends
			user.friends.push(friendId);
			// Add user to friend's friends
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		// Finally, return new friends list
		const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);

		res.status(200).json(formattedFriends);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
