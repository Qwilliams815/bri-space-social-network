import { Box, useMediaQuery } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "@/scenes/navBar";
import FriendListWidget from "@/scenes/widgets/FriendListWidget";
import MyPostWidget from "@/scenes/widgets/MyPostWidget";
import PostsWidget from "@/scenes/widgets/PostsWidget";
import UserWidget from "@/scenes/widgets/UserWidget";
import WidgetWrapper from "@/components/WidgetWrapper";

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const { userId } = useParams();
	const [isLoggedInUser, setIsLoggedInUser] = useState(false);
	const token = useSelector((state) => state.token);
	const { _id, picturePath } = useSelector((state) => state.user);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	const getUser = async () => {
		const response = await fetch(`http://localhost:3001/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		// console.log(editable);

		// console.log(editable);
		// console.log(_id);
		// console.log(data._id);
		setIsLoggedInUser(data._id === _id);
		setUser(data);
	};

	useEffect(() => {
		getUser();
	}, []);

	if (!user) return null;

	return (
		<Box>
			<NavBar />
			<Box
				height="10rem"
				width={isNonMobileScreens ? "62%" : "87%"}
				m={"0 auto"}
				mt={"2rem"}
				borderRadius="0.75rem"
				sx={{
					backgroundImage: `url("https://hips.hearstapps.com/hmg-prod/images/ripe-yellow-bananas-at-the-shopping-market-fruits-royalty-free-image-1712833209.jpg")}`,
				}}
				style={{ backgroundPosition: "center", backgroundSize: "cover" }}
				// backgroundimage={user.picturePath}
			/>

			<Box
				width="100%"
				padding="2rem 6%"
				display={isNonMobileScreens ? "flex" : "block"}
				gap="2rem"
				justifyContent="center"
			>
				<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
					<Box sx={{ position: "sticky", top: "120px" }}>
						<UserWidget
							userId={userId}
							picturePath={user.picturePath}
							isLoggedInUser={isLoggedInUser}
						/>
						<Box m="2rem 0" />
						{/* THROWS ERROR WHYYYY */}
						<FriendListWidget userId={userId} isLoggedInUser={isLoggedInUser} />
					</Box>
				</Box>
				<Box
					flexBasis={isNonMobileScreens ? "42%" : undefined}
					mt={isNonMobileScreens ? undefined : "2rem"}
				>
					{isLoggedInUser && <MyPostWidget picturePath={user.picturePath} />}
					{/* THROWS ERROR WHYYYY */}
					<PostsWidget userId={userId} isProfile isLoggedInUser={isLoggedInUser} />
				</Box>
			</Box>
		</Box>
	);
};

export default ProfilePage;
