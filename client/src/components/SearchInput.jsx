import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, useTheme } from "@mui/system";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { InputBase } from "@mui/material";

export default function SearchInput({ users }) {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;
	const navigate = useNavigate();
	const theme = useTheme();

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			if (active) {
				setOptions([...users]);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Autocomplete
			id="asynchronous-demo"
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onClick={() => console.log("clicked")}
			isOptionEqualToValue={(option, value) => option.title === value.title}
			getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
			renderOption={(props, option) => (
				<li
					{...props}
					key={option._id}
					onClick={() => {
						navigate(`/profile/${option._id}`);
						navigate(0);
					}}
				>
					{option.firstName} {option.lastName}
				</li>
			)}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					sx={{
						backgroundColor: theme.palette.neutral.light,
						borderRadius: "30px",
						padding: "0 1rem",
						"& .MuiOutlinedInput-root": {
							borderRadius: "30px",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							display: "none",
						},
						"& .MuiInputLabel-shrink": {
							display: "none",
						},
					}}
					{...params}
					placeholder="Search..."
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{
									loading ? <CircularProgress color="inherit" size={20} /> : null
									// <IconButton onClick={() => console.log(params.InputProps.isOptionEqualToValue)}>
									// 	<Search sx={{ color: theme.palette.neutral.main }} />
									// </IconButton>
								}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
}
