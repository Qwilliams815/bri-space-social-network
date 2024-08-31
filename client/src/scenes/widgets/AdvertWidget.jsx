import { Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useMediaQuery } from "@mui/material";

const AdvertWidget = () => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

	return (
		<WidgetWrapper
		// sx={isNonMobileScreens ? { position: "fixed", width: "23%" } : null}
		// sx={
		// 	isNonMobileScreens
		// 		? { position: "sticky", top: "110px", border: "solid 1px red" }
		// 		: null
		// }
		>
			<FlexBetween>
				<Typography color={dark} variant="h5" fontWeight="500">
					Sponsored
				</Typography>
				<Typography color={medium}>Create Ad</Typography>
			</FlexBetween>
			<img
				width="100%"
				height="auto"
				alt="advert"
				src="http://localhost:3001/assets/advert.jpeg"
				style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
			/>
			<FlexBetween>
				<Typography color={main}>Beauty by Brian</Typography>
			</FlexBetween>
			<Typography color={medium}>beautybybrian.com</Typography>
			<Typography color={medium} m="0.5rem 0">
				Your pathway to immaculate beauty and well-being. <br></br> Bri-ten your skin
				today!
			</Typography>
		</WidgetWrapper>
	);
};

export default AdvertWidget;
