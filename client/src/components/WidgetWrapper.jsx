import React from "react";
import { Box } from "@mui/material";
import { display, styled } from "@mui/system";

const WidgetWapper = styled(Box)(({ theme }) => ({
	padding: "1.5rem 1.5rem 0.75rem 1.5rem",
	backgroundColor: theme.palette.background.alt,
	borderRadius: "0.75rem",
	// display: "flex",
	// flexDirection: "column",
}));

export default WidgetWapper;
