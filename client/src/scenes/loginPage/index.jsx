import React from "react";
import {
	Box,
	Container,
	Typography,
	useTheme,
	useMediaQuery,
	Link,
	Divider,
} from "@mui/material";
import Form from "./Form";
import { ForkLeft } from "@mui/icons-material";
import { Transform } from "@mui/icons-material";

export default function LoginPage() {
	const theme = useTheme();
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	return (
		<Box
			minHeight="100vh"
			sx={{
				minHeight: "100vh",
				position: "relative",
				pb: "10rem",
				overflowY: "hidden",
			}}
		>
			{/* NAVBAR */}
			<Box
				width="100%"
				backgroundColor={theme.palette.background.alt}
				p="1rem 6%"
				display="flex"
				alignItems="center"
			>
				<svg
					width="40"
					height="22"
					viewBox="0 0 107 87"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M66.3197 54.1967C66.3197 43.1691 75.2593 34.2295 86.2869 34.2295V34.2295C97.3145 34.2295 106.254 43.1691 106.254 54.1967V87H66.3197V54.1967Z"
						fill={theme.palette.primary.main}
					/>
					<path
						d="M30.6639 59.0365C30.6639 49.636 38.2846 42.0153 47.6852 42.0153V42.0153C57.0857 42.0153 64.7064 49.636 64.7064 59.0366V87H30.6639V59.0365Z"
						fill={theme.palette.primary.main}
					/>
					<path
						d="M0 63.2311C0 55.2406 6.47757 48.7631 14.468 48.7631V48.7631C22.4585 48.7631 28.9361 55.2406 28.9361 63.2311V87H0V63.2311Z"
						fill={theme.palette.primary.main}
					/>
					<circle
						cx="85.9304"
						cy="14.6189"
						r="14.6189"
						fill={theme.palette.primary.main}
					/>
					<circle cx="47.3812" cy="25.298" r="12.462" fill={theme.palette.primary.main} />
					<ellipse
						cx="14.2097"
						cy="34.5534"
						rx="10.5927"
						ry="10.5927"
						fill={theme.palette.primary.main}
					/>
				</svg>
				<Typography
					fontWeight={"bold"}
					fontSize="32px"
					color="primary"
					// sx is a style object from Material UI used for writing inline styles
					sx={{ "&:hover": { color: "primary", cursor: "pointer" } }}
				>
					BriSpace
				</Typography>
			</Box>

			<Container
				sx={{
					display: "flex",
					flexDirection: isNonMobileScreens ? "row" : "column",
				}}
			>
				<Box
					width={isNonMobileScreens ? "45%" : "93%"}
					p="2rem"
					m="2rem auto"
					borderRadius="1.5rem"
					display={isNonMobileScreens ? "flex" : "none"}
					height="450px"
					sx={{ position: "relative" }}
				>
					<Typography
						fontWeight={"bold"}
						fontSize="32px"
						color="primary"
						// textAlign="center"
						// sx is a style object from Material UI used for writing inline styles
						sx={{ "&:hover": { color: "primary", cursor: "pointer" } }}
					>
						{/* All Brian's, All the Time. */}
					</Typography>
					<img
						src="./public/assets/world2.png"
						alt="World of Brians"
						width="100%"
						style={{
							position: "absolute",
							bottom: "-160%",
							left: "-100%",
							zIndex: "-1",
							width: "1435px",
						}}
					/>
				</Box>

				{/* FORM */}
				<Box
					width={isNonMobileScreens ? "45%" : "93%"}
					p="2rem"
					m="2rem auto"
					borderRadius="1.5rem"
					backgroundColor={theme.palette.background.alt}
					sx={{ opacity: "0.99" }}
				>
					<Typography
						fontWeight={"bold"}
						fontSize="32px"
						color="primary"
						// sx is a style object from Material UI used for writing inline styles
						sx={{ textAlign: "center", mb: "1.5rem", "&:hover": { cursor: "pointer" } }}
					>
						Log In
					</Typography>
					<Typography
						fontWeight="500"
						color={theme.palette.primary.main}
						variant="h5"
						sx={{ mb: "1.5rem", textAlign: "center" }}
					>
						Welcome to BriSpace, the Social Media for Brians!
					</Typography>
					<Form />
				</Box>
			</Container>

			{/* FOOTER */}
			<Box
				width="100%"
				backgroundColor={theme.palette.background.alt}
				p="2rem"
				position="absolute"
				bottom="0"
				display="flex"
				flexWrap="wrap"
				justifyContent="space-around"
			>
				<Link
					href="#"
					underline="hover"
					color={theme.palette.neutral.medium}
					p={"1rem"}
				>
					Terms of Service
				</Link>
				<Divider orientation="vertical" flexItem />
				<Link
					href="#"
					underline="hover"
					color={theme.palette.neutral.medium}
					p={"1rem"}
				>
					Privacy Policy
				</Link>
				<Divider orientation="vertical" flexItem />
				<Link
					href="#"
					underline="hover"
					color={theme.palette.neutral.medium}
					p={"1rem"}
				>
					Cookie Policy
				</Link>
				<Divider orientation="vertical" flexItem />
				<p
					href="#"
					underline="hover"
					style={{ color: theme.palette.neutral.medium, padding: "1rem" }}
				>
					© 2024 BriSpace Corp.
				</p>
			</Box>
		</Box>
	);
}
