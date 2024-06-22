import React from "react";
import { useState } from "react";
import {
	Box,
	IconButton,
	InputBase,
	Typography,
	Select,
	MenuItem,
	FormControl,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import {
	Search,
	Message,
	DarkMode,
	LightMode,
	Notifications,
	Help,
	Menu,
	Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "@/state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "@/components/FlexBetween";
import { Light } from "@mui/icons-material";

export default function NavBar() {
	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Material UI media query hook

	const theme = useTheme();
	const neutralLight = theme.palette.neutral.light;
	const dark = theme.palette.neutral.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const alt = theme.palette.background.alt;

	const fullName = `${user.firstName} ${user.lastName}`;
	// const fullName = "Brian Williams";
	return (
		<FlexBetween padding="1rem 6%" backgroundColor={alt}>
			{/* Nav Left Side (Logo + Search Bar) */}
			<FlexBetween gap="1.75rem">
				{/* Logo */}
				<Typography
					fontWeight={"bold"}
					fontSize="clamp(1rem, 2rem, 2.25rem)"
					color="primary"
					onClick={() => navigate("/home")}
					// sx is a style object from Material UI used for writing inline styles
					sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
				>
					BriSpace
				</Typography>

				{/* Desktop Search Bar*/}
				{isNonMobileScreens && (
					<FlexBetween
						backgroundColor={neutralLight}
						borderRadius="9px"
						gap="3rem"
						padding="0.1rem 1.5rem"
					>
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				)}
			</FlexBetween>

			{/* Nav Right Side (Buttons + User) DESKTOP NAV */}
			{isNonMobileScreens ? (
				<FlexBetween gap="2rem">
					{/* Redux dark and lightmode switch */}
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkMode sx={{ fontSize: "25px" }} />
						) : (
							<LightMode sx={{ color: dark, fontSize: "25px" }} />
						)}
					</IconButton>
					<Message sx={{ color: dark, fontSize: "25px" }} />
					<Notifications sx={{ color: dark, fontSize: "25px" }} />
					<Help sx={{ color: dark, fontSize: "25px" }} />
					<FormControl variant="standard" value={fullName}>
						<Select
							value={fullName}
							sx={{
								background: neutralLight,
								width: "150px",
								border: "none",
								outline: "none",
								"& .MuiSvgIcon-root": {
									pr: "0.15rem",
									width: "3rem",
								},
								"& .MuiSelect-select:focus": {
									backgroundColor: neutralLight,
								},
							}}
						>
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>
							<MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
					<Menu />
				</IconButton>
			)}

			{/* Mobile Nav */}
			{!isNonMobileScreens && isMobileMenuToggled && (
				<Box
					position="fixed"
					border="1px solid"
					right="0"
					bottom="0"
					height="100%"
					zIndex="10"
					maxWidth="500px"
					minWidth="300px"
					backgroundColor={background}
				>
					{/* Close Icon */}
					<Box display="flex" justifyContent="flex-end" p="1rem">
						<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
							<Close />
						</IconButton>
					</Box>

					{/* Menu Items */}
					<FlexBetween
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						gap="3rem"
					>
						{/* Redux dark and lightmode switch */}
						<IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
							{theme.palette.mode === "dark" ? (
								<DarkMode sx={{ fontSize: "25px" }} />
							) : (
								<LightMode sx={{ color: dark, fontSize: "25px" }} />
							)}
						</IconButton>
						<Message sx={{ color: dark, fontSize: "25px" }} />
						<Notifications sx={{ color: dark, fontSize: "25px" }} />
						<Help sx={{ color: dark, fontSize: "25px" }} />
						<FormControl variant="standard" value={fullName}>
							<Select
								value={fullName}
								sx={{
									background: neutralLight,
									width: "150px",
									border: "none",
									outline: "none",
									"& .MuiSvgIcon-root": {
										pr: "0.15rem",
										width: "3rem",
									},
									"& .MuiSelect-select:focus": {
										backgroundColor: neutralLight,
									},
								}}
							>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	);
}
