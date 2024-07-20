import { useState } from "react";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Profile image for each user
const UserImage = ({ image, size = "60px" }) => {
	const [error, setError] = useState(false);

	return (
		<Box width={size} height={size} sx={{ "&:hover": { cursor: "pointer" } }}>
			{error ? (
				<AccountCircleIcon
					style={{
						width: size,
						height: size,
					}}
				/>
			) : (
				<img
					alt="user"
					src={`http://localhost:3001/assets/${image}`}
					style={{ objectFit: "cover", borderRadius: "50%" }}
					width={size}
					height={size}
					onError={(e) => {
						setError(true);
						e.onerror = null;
					}}
				/>
			)}
		</Box>
	);
};

export default UserImage;
