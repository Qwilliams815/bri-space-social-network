import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

export default function LoginPage() {
	const theme = useTheme();
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	return (
		<Box>
			<Box
				width="100%"
				backgroundColor={theme.palette.background.alt}
				p="1rem 6%"
				textAlign="center"
			>
				<Typography
					fontWeight={"bold"}
					fontSize="32px"
					color="primary"
					// sx is a style object from Material UI used for writing inline styles
					sx={{ "&:hover": { color: "primary", cursor: "pointer" } }}
				>
					Log In
				</Typography>
			</Box>

			<Box
				width={isNonMobileScreens ? "50%" : "93%"}
				p="2rem"
				m="2rem auto"
				borderRadius="1.5rem"
				backgroundColor={theme.palette.background.alt}
			>
				<Typography
					fontWeight="500"
					color={theme.palette.primary.main}
					variant="h5"
					sx={{ mb: "1.5rem" }}
				>
					Welcome to BriSpace, the Social Media for Brians!
				</Typography>
				<Form />
			</Box>
		</Box>
	);
}
