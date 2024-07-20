import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// light mode
	mode: "light",
	user: null,
	token: null,
	posts: [],
	users: [],
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
		setUsers: (state, action) => {
			const updatedUsers = state.users.map((user) => {
				if (user._id === action.payload.user._id) return action.payload.user;
				return user;
			});
			state.users = updatedUsers;
		},
	},
});

export const {
	setMode,
	setLogin,
	setLogout,
	setFriends,
	setPosts,
	setPost,
	setUsers,
} = authSlice.actions;
export default authSlice.reducer;
