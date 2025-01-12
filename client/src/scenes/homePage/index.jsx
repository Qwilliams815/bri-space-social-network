import React from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NavBar from "@/scenes/navBar";
import UserWidget from "@/scenes/widgets/UserWidget";
import MyPostWidget from "@/scenes/widgets/MyPostWidget";
import PostsWidget from "@/scenes/widgets/PostsWidget";
import AdvertWidget from "@/scenes/widgets/AdvertWidget";
import FriendListWidget from "@/scenes/widgets/FriendListWidget";

export default function HomePage() {
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
	const { _id, picturePath } = useSelector((state) => state.user);

	return (
		<Box>
			<NavBar />
			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="0.5rem"
				justifyContent="space-between"
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<Box sx={{ position: "sticky", top: "120px" }}>
						<UserWidget userId={_id} picturePath={picturePath} isHomePage />
					</Box>
				</Box>

				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}
				>
					<MyPostWidget picturePath={picturePath} />
					<PostsWidget userId={_id} userImage={picturePath} isHomePage />
				</Box>

				{isNonMobileScreens && (
					<Box flexBasis="26%">
						<Box sx={{ position: "sticky", top: "120px" }}>
							<AdvertWidget />
							<Box m="2rem 0" />
							<FriendListWidget userId={_id} isHomePage />
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
}
