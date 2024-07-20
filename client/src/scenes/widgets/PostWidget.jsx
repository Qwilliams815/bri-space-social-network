import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
} from "@mui/icons-material";
// import {
// 	Box,
// 	Divider,
// 	Typography,
// 	InputBase,
// 	useTheme,
// 	Button,
// 	IconButton,
// 	useMediaQuery,
// } from "@mui/material";
import {
	Box,
	Divider,
	IconButton,
	Typography,
	useTheme,
	InputBase,
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/state";
import UserImage from "@/components/UserImage";
import { sizeHeight } from "@mui/system";

const PostWidget = ({
	postId,
	postUserId,
	name,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
	userImage,
	isLoggedInUser,
	isHomePage,
}) => {
	const [isComments, setIsComments] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const loggedInPicturePath = useSelector((state) => state.user.picturePath);
	const isLiked = Boolean(likes[loggedInUserId]);
	const likeCount = Object.keys(likes).length;

	const { palette } = useTheme();
	const main = palette.neutral.main;
	const primary = palette.primary.main;

	const patchLike = async () => {
		const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});
		const updatedPost = await response.json();
		dispatch(setPost({ post: updatedPost }));
	};

	return (
		<WidgetWrapper mb="2rem">
			<Friend
				friendId={postUserId}
				name={name}
				subtitle={location}
				userPicturePath={userPicturePath}
				isLoggedInUser={isLoggedInUser}
				isHomePage={isHomePage}
			/>
			<Typography color={main} sx={{ mt: "1rem" }}>
				{description}
			</Typography>
			{picturePath && (
				<img
					width="100%"
					height="auto"
					alt="post"
					style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
					src={`http://localhost:3001/assets/${picturePath}`}
				/>
			)}
			<FlexBetween mt="0.25rem">
				<FlexBetween gap="1rem">
					<FlexBetween gap="0.3rem">
						<IconButton onClick={patchLike}>
							{isLiked ? (
								<FavoriteOutlined sx={{ color: primary }} />
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>

					<FlexBetween gap="0.3rem">
						<IconButton onClick={() => setIsComments(!isComments)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>

				<IconButton>
					<ShareOutlined />
				</IconButton>
			</FlexBetween>
			{isComments && (
				<Box mt="0.5rem">
					{comments.map((comment, i) => (
						<Box key={`${name}-${i}`}>
							<Divider />
							<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
								{comment}
							</Typography>
						</Box>
					))}
					<Divider />

					<FlexBetween gap="0.5rem" mt="0.5rem">
						<UserImage image={loggedInPicturePath} size="40px" />
						<InputBase
							placeholder="Post your reply..."
							// onChange={(e) => setPost(e.target.value)}
							// value={post}
							sx={{
								width: "100%",
								backgroundColor: palette.neutral.light,
								borderRadius: "2rem",
								padding: "0.5rem 2rem",
							}}
						/>
					</FlexBetween>
				</Box>
			)}
		</WidgetWrapper>
	);
};

export default PostWidget;
