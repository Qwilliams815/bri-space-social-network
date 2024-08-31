import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state";
import { useState, useEffect } from "react";

const AddRemoveFriendButton = ({ friendId, isProfile }) => {
	const dispatch = useDispatch();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);

	const { palette } = useTheme();
	const primaryLight = palette.primary.light;
	const primaryDark = palette.primary.dark;

	const isFriend = friends.find(
		(friend) => friend._id === _id || friend._id === friendId
	);

	const getFriends = async () => {
		const response = await fetch(
			`http://localhost:3001/users/${friendId}/friends`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		// setMyFriends(data);
		dispatch(setFriends({ friends: data }));
	};

	const patchFriend = async () => {
		const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		isProfile ? getFriends() : dispatch(setFriends({ friends: data }));
	};

	return (
		<IconButton
			onClick={() => patchFriend()}
			sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
		>
			{isFriend ? (
				<PersonRemoveOutlined sx={{ color: primaryDark }} />
			) : (
				<PersonAddOutlined sx={{ color: primaryDark }} />
			)}
		</IconButton>
	);
};

export default AddRemoveFriendButton;
