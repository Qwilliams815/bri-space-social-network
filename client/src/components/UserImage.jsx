import { Box } from "@mui/material";

// Profile image for each user
const UserImage = ({ image, size = "60px" }) => {
	return (
		<Box width={size} height={size}>
			<img
				alt="user"
				src={`http://localhost:3001/assets/${image}`}
				style={{ objectFit: "cover", borderRadius: "50%" }}
				width={size}
				height={size}
			/>
		</Box>
	);
};

export default UserImage;
