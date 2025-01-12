import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "@/components/UserImage";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import AddRemoveFriendButton from "@/components/AddRemoveFriendButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({
	userId,
	picturePath,
	isLoggedInUser,
	isHomePage,
	isProfile,
}) => {
	const [user, setUser] = useState(null);
	const { palette } = useTheme();
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	const getUser = async () => {
		const response = await fetch(`http://localhost:3001/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setUser(data);
	};
	// console.log(isProfile);

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!user) {
		// TODO: Add loading state
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		viewedProfile,
		impressions,
		friends,
	} = user;

	return (
		<WidgetWrapper>
			{/* FIRST ROW: Pfp, name, friends, add fried */}
			<FlexBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}
			>
				<FlexBetween gap="1rem">
					<UserImage image={picturePath} />
					<Box>
						<Typography
							variant="h4"
							color={dark}
							fontWeight="500"
							sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer" } }}
						>
							{firstName} {lastName}
						</Typography>
						<Typography color={medium}>{friends.length} friends</Typography>
					</Box>
				</FlexBetween>
				{/* If current user is on the homepage or my profile page, show an edit button instead of add/remove friend button */}
				{isHomePage || isLoggedInUser ? (
					<ManageAccountsOutlined />
				) : (
					<AddRemoveFriendButton friendId={userId} isProfile={isProfile} />
				)}
			</FlexBetween>

			<Divider />

			{/* SECOND ROW: location, occupation */}
			<Box p="1rem 0">
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{location}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>
			<Divider />

			{/* THIRD ROW: viewed profile, impressions */}
			<Box p="1rem 0">
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>Profile views</Typography>
					<Typography color={main} fontWeight="500">
						{viewedProfile}
					</Typography>
				</FlexBetween>
				<FlexBetween>
					<Typography color={medium}>Post impressions</Typography>
					<Typography color={main} fontWeight="500">
						{impressions}
					</Typography>
				</FlexBetween>
			</Box>
			<Divider />

			{/* FOURTH ROW: edit profile */}
			<Box p="1rem 0">
				<Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
					Social Profiles
				</Typography>
				<FlexBetween gap="1rem" mb="0.5rem">
					<FlexBetween gap="1rem">
						<img src="../assets/twitter.png" alt="twitter" />
						<Box>
							<Typography color={main} fontWeight="500">
								Twitter
							</Typography>
							<Typography color={medium}>Social Network</Typography>
						</Box>
					</FlexBetween>
					{isLoggedInUser ? <EditOutlined sx={{ color: main }} /> : null}
				</FlexBetween>

				<FlexBetween gap="1rem">
					<FlexBetween gap="1rem">
						<img src="../assets/linkedin.png" alt="linkedin" />
						<Box>
							<Typography color={main} fontWeight="500">
								linkedIn
							</Typography>
							<Typography color={medium}>Network Platform</Typography>
						</Box>
					</FlexBetween>
					{isLoggedInUser ? <EditOutlined sx={{ color: main }} /> : null}
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
