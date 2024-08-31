import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
	isProfile,
	isProfilePostWidget,
}) => {
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state.user);
	const isMe = _id === friendId; // Used for eliminating the add/remove friend button from my listing in other people's friendlistWidget

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	// sx={{ border: `1px solid red` }}

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
			{/* Cases:
			1. if on homepage and !me - does not show the add/remove friend button next to my name on my posts.
			2.  isLoggedInUser (coming from friendsListWidget) && !isMe - does not show the add/remove friend button next to my name on my posts.
			IsLoggedInUser is checking to see if its my Profile page, isMe is just checking if the actual freindId is mine or not.
			If its my profile page or its the homepage and the friendId is not me, show the add/remove friend button
			*/}
			{/* {(isProfile || isHomePage) && !isMe && ( */}
			{(isLoggedInUser || isHomePage || isProfilePostWidget) && !isMe && (
				<AddRemoveFriendButton friendId={friendId} isProfile={isProfile} />
			)}
		</FlexBetween>
	);
};

export default Friend;
