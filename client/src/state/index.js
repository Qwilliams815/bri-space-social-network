import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// light mode
	mode: "light",
	user: null,
	token: null,
	posts: [],
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	// Functions that involve modifying the global state (initialState)
	reducers: {
		setMode: (state) => {
			// toolkit Immer makes it look like we're mutating the state, but under the hood it is creating a new copy.
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) => {
			// Action is basically just an arguments object for the function
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setFriends: (state, action) => {
			// If logged in, update the friends list
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.error("user friends non-existent :(");
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		// For updating a single post
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post) => {
				if (post._id === action.payload.post._id) return action.payload.post;
				return post;
			});
			state.posts = updatedPosts;
		},
	},
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
	authSlice.actions;
export default authSlice.reducer;
