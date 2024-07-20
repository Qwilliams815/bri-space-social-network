import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "@/state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import AddRemoveFriendButton from "./AddRemoveFriendButton";

const Friend = ({
	friendId,
	name,
	subtitle,
	userPicturePath,
	isLoggedInUser,
	isHomePage,
}) => {
	const navigate = useNavigate();

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	// Used to toggle add/remove friend button icon
	// dispatch(setFriends([]));

	// for (let friend of friends) {
	// 	console.log(friend);
	// 	const isFriend = friend._id === friendId;
	// }

	// const isFriend = Array.isArray(friends)
	// 	? friends.find((friend) => friend._id === friendId)
	// 	: undefined;

	return (
		<FlexBetween>
			<FlexBetween gap="1rem">
				<UserImage image={userPicturePath} size="55px" />
				<Box
					onClick={() => {
						navigate(`/profile/${friendId}`);
						navigate(0);
					}}
				>
					<Typography
						color={main}
						variant="h5"
						fontWeight="500"
						sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer" } }}
					>
						{name}
					</Typography>
					<Typography color={medium} fontSize="0.75rem">
						{subtitle}
					</Typography>
				</Box>
			</FlexBetween>

			{(isLoggedInUser || isHomePage) && (
				<AddRemoveFriendButton friendId={friendId} />
			)}
		</FlexBetween>
	);
};

export default Friend;
