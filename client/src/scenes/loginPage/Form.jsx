import React from "react";
import { useState } from "react";
import {
	Box,
	Button,
	TextField,
	useMediaQuery,
	Typography,
	CircularProgress,
	useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // Form library
import * as yup from "yup"; // Validation library
import { useNavigate } from "react-router-dom"; // Navigate registration
import { useDispatch } from "react-redux"; // React redux for storing login info
import { setLogin } from "@/state";
import Dropzone from "react-dropzone"; // File upload (profile picture)
import FlexBetween from "@/components/FlexBetween";

// Create registration schema with Yup
const registerSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
	// confirmPassword: yup.string().required("required"),
	location: yup.string().required("required"),
	occupation: yup.string().required("required"),
	picture: yup.string(),
});

const loginSchema = yup.object().shape({
	email: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
});

const initialValuesRegister = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	// confirmPassword: "",
	location: "",
	occupation: "",
	picture: "",
};

const initialValuesLogin = {
	email: "",
	password: "",
};

// Form Component
export default function Form() {
	const [pageType, setPageType] = useState("login"); // Used to display either Login or register form
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { palette } = useTheme();
	const dispatch = useDispatch(); // React redux
	const navigate = useNavigate(); // Navigate to other pages
	const isNonMobile = useMediaQuery("(min-width:600px)");
	const isRegister = pageType === "register";
	const isLogin = pageType === "login";

	const register = async (values, onSubmitProps) => {
		const formData = new FormData();

		// Allows sending form data including picture
		for (let value in values) {
			// use "in" to get the index of values
			formData.append(value, values[value]);
		}
		formData.append("picturePath", values.picture.name);

		const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
			method: "POST",
			body: formData,
		});

		const savedUser = await savedUserResponse.json();
		onSubmitProps.resetForm();

		if (savedUser) {
			setPageType("login");
		}
	};

	// Login
	const login = async (values, onSubmitProps) => {
		setLoading(true);
		try {
			const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const loggedIn = await loggedInResponse.json();
			console.log(loggedIn.msg);
			if (loggedIn) {
				console.log("true");
			}
			onSubmitProps.resetForm();
			if (loggedIn) {
				dispatch(
					// Set login state with Redux
					setLogin({
						user: loggedIn.user,
						token: loggedIn.token,
					})
				);
				navigate("/home");
			} else {
				alert("Invalid credentials");
			}
		} catch (error) {
			console.log("NEW ERROR", error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		if (isLogin) await login(values, onSubmitProps);
		if (isRegister) await register(values, onSubmitProps);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
			validationSchema={isLogin ? loginSchema : registerSchema}
		>
			{/* Funky Formik syntax */}
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
				resetForm,
			}) => (
				<form onSubmit={handleSubmit}>
					<Box
						display="grid"
						gap="30px"
						gridTemplateColumns="repeat(2, minmax(0, 1fr))"
						sx={{
							"& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
						}}
					>
						{isRegister && (
							<>
								<TextField
									label="First Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="firstName"
									error={touched.firstName && Boolean(errors.firstName)}
									helperText={touched.firstName && errors.firstName}
									sx={{ gridColumn: "span 1" }}
								/>
								<TextField
									label="Last Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name="lastName"
									error={touched.lastName && Boolean(errors.lastName)}
									helperText={touched.lastName && errors.lastName}
									sx={{ gridColumn: "span 1" }}
								/>
								<TextField
									label="Location"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.location}
									name="location"
									error={touched.location && Boolean(errors.location)}
									helperText={touched.location && errors.location}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									label="Occupation"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.occupation}
									name="occupation"
									error={touched.occupation && Boolean(errors.occupation)}
									helperText={touched.occupation && errors.occupation}
									sx={{ gridColumn: "span 2" }}
								/>
								<Box
									gridColumn="span 2"
									border={`1px solid ${palette.neutral.medium}`}
									borderRadius="5px"
									p="1rem"
								>
									<Dropzone
										acceptedFiles=".jpg,.jpeg,.png"
										multiple={false}
										onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
									>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()} // Prop drilling for dropzone
												border={`2px dashed ${palette.primary.main}`}
												p="1rem"
												sx={{ "&:hover": { cursor: "pointer" } }}
											>
												<input {...getInputProps()} />
												{!values.picture ? (
													<p>Add Picture Here</p>
												) : (
													<FlexBetween>
														<Typography>{values.picture.name}</Typography>
														<EditOutlinedIcon />
													</FlexBetween>
												)}
											</Box>
										)}
									</Dropzone>
								</Box>
							</>
						)}
						<TextField
							label="Email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.email}
							name="email"
							error={touched.email && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							sx={{ gridColumn: "span 2" }}
						/>
						<TextField
							label="Password"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.password}
							name="password"
							error={touched.password && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							sx={{ gridColumn: "span 2" }}
						/>
					</Box>

					{/* Buttons */}
					<Box>
						{error && (
							<Typography sx={{ color: palette.error.main, mt: "1rem" }} variant="subtitle2">
								Error connecting to server. Please try again later.
							</Typography>
						)}
						<Button
							fullWidth
							type="submit"
							sx={{
								m: "2rem 0",
								p: "1rem",
								backgroundColor: loading ? palette.background.alt : palette.primary.main,
								color: palette.background.alt,
								"&:hover": { color: palette.primary.main },
							}}
						>
							{loading ? <CircularProgress /> : isLogin ? "LOGIN" : "REGISTER"}
						</Button>
						<Typography
							onClick={() => {
								setPageType(isLogin ? "register" : "login");
								setError(false);
								resetForm();
							}}
							sx={{
								textDecoration: "underline",
								color: palette.primary.main,
								"&:hover": {
									cursor: "pointer",
									color: palette.primary.light,
								},
							}}
						>
							{isLogin
								? "Don't have an account? Sign Up here."
								: "Already have an account? Login here."}
						</Typography>
					</Box>
				</form>
			)}
		</Formik>
	);
}
