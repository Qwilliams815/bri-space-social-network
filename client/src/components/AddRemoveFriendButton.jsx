import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state";
import { useState, useEffect } from "react";
import { ControlPointSharp } from "@mui/icons-material";

const AddRemoveFriendButton = ({ friendId }) => {
	const dispatch = useDispatch();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);
	const [myFriends, setMyFriends] = useState([]);

	const { palette } = useTheme();
	const primaryLight = palette.primary.light;
	const primaryDark = palette.primary.dark;

	const isFriend =
		friendId === _id
			? friends.find((friend) => friend._id === friendId)
			: myFriends.find((friend) => friend._id === friendId);
      
	// console.log(friendId);
	// console.log(myFriends);
	// console.log(state.user);

	const patchFriend = async () => {
		const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		dispatch(setFriends({ friends: data }));
	};

	const getFriends = async () => {
		const response = await fetch(`http://localhost:3001/users/${_id}/friends`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setMyFriends(data);
		// dispatch(setFriends({ friends: data }));
	};

	useEffect(() => {
		getFriends();
		console.log(friendId);
	}, [friends]);

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
