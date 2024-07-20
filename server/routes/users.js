import express from "express";
import {
	getUser,
	getUsers,
	// getLoggedInUser,
	getUserFriends,
	addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getUsers);
// router.get("/loggedInUser", verifyToken, getLoggedInUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;

// state = reducers(
// 	{
// 		mode: "light",
// 		user: {
// 			_id: "666b52c9f03277c3644a6231",
// 			firstName: "1234",
// 			lastName: "1234",
// 			email: "1234@mail.com",
// 			password: "$2b$10$m7VTmH0sSG0hjLYk9VpR2elVCw1Cn0SLX4e/rqPRTwXT45EqgJwLa",
// 			picturePath: "aussie snake.png",
// 			friends: [],
// 			location: "1234",
// 			occupation: "1234",
// 			viewedProfile: 5342,
// 			impressions: 8417,
// 			createdAt: "2024-06-13T20:12:57.974Z",
// 			updatedAt: "2024-06-13T20:12:57.974Z",
// 			__v: 0,
// 		},
// 		token:
// 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmI1MmM5ZjAzMjc3YzM2NDRhNjIzMSIsImlhdCI6MTcxODMzMzQ1MH0.spQ5qntJYbRC0mj8Fx-meLAgCMhlZhbBb-MtDK4neBg",
// 		posts: [],
// 		_persist: { version: 1, rehydrated: true },
// 	},
// 	{
// 		type: "auth/setPosts",
// 		payload: {
// 			posts: [
// 				{
// 					_id: "664fbcd87fc800477172a03e",
// 					userId: "664fbcd87fc800477172a037",
// 					firstName: "Steve",
// 					lastName: "Ralph",
// 					location: "New York, CA",
// 					description: "Some really long random description",
// 					picturePath: "post1.jpeg",
// 					userPicturePath: "p3.jpeg",
// 					likes: {
// 						"664fbcd87fc800477172a036": true,
// 						"664fbcd87fc800477172a038": true,
// 						"664fbcd87fc800477172a039": true,
// 						"664fbcd87fc800477172a03a": true,
// 					},
// 					comments: [
// 						"random comment",
// 						"another random comment",
// 						"yet another random comment",
// 					],
// 					__v: 0,
// 					createdAt: "2024-05-23T22:02:01.211Z",
// 					updatedAt: "2024-05-23T22:02:01.211Z",
// 				},
// 				{
// 					_id: "664fbcd87fc800477172a03f",
// 					userId: "664fbcd87fc800477172a039",
// 					firstName: "Whatcha",
// 					lastName: "Doing",
// 					location: "Korea, CA",
// 					description:
// 						"Another really long random description. This one is longer than the previous one.",
// 					picturePath: "post2.jpeg",
// 					userPicturePath: "p6.jpeg",
// 					likes: {
// 						"664fbcd87fc800477172a03d": true,
// 						"664fbcd87fc800477172a03a": true,
// 						"664fbcd87fc800477172a037": true,
// 						"664fbcd87fc800477172a038": true,
// 						"665bd84b2dd8db1691e48ee3": true,
// 					},
// 					comments: [
// 						"one more random comment",
// 						"and another random comment",
// 						"no more random comments",
// 						"I lied, one more random comment",
// 					],
// 					__v: 0,
// 					createdAt: "2024-05-23T22:02:01.212Z",
// 					updatedAt: "2024-06-12T01:06:38.364Z",
// 				},
// 				{
// 					_id: "664fbcd87fc800477172a040",
// 					userId: "664fbcd87fc800477172a03a",
// 					firstName: "Jane",
// 					lastName: "Doe",
// 					location: "Utah, CA",
// 					description:
// 						"This is the last really long random description. This one is longer than the previous one.",
// 					picturePath: "post3.jpeg",
// 					userPicturePath: "p5.jpeg",
// 					likes: {
// 						"664fbcd87fc800477172a037": true,
// 						"664fbcd87fc800477172a03c": true,
// 						"664fbcd87fc800477172a039": true,
// 						"664fbcd87fc800477172a03b": true,
// 					},
// 					comments: [
// 						"one more random comment",
// 						"I lied, one more random comment",
// 						"I lied again, one more random comment",
// 						"Why am I doing this?",
// 						"I'm bored",
// 					],
// 					__v: 0,
// 					createdAt: "2024-05-23T22:02:01.212Z",
// 					updatedAt: "2024-05-23T22:02:01.212Z",
// 				},
// 				{
// 					_id: "664fbcd87fc800477172a041",
// 					userId: "664fbcd87fc800477172a03b",
// 					firstName: "Harvey",
// 					lastName: "Dunn",
// 					location: "Los Angeles, CA",
// 					description:
// 						"This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
// 					picturePath: "post4.jpeg",
// 					userPicturePath: "p7.jpeg",
// 					likes: {
// 						"664fbcd87fc800477172a037": true,
// 						"664fbcd87fc800477172a03c": true,
// 						"664fbcd87fc800477172a039": true,
// 					},
// 					comments: [
// 						"I lied again, one more random comment",
// 						"Why am I doing this?",
// 						"I'm bored",
// 						"I'm still bored",
// 						"All I want to do is play video games",
// 						"I'm going to play video games",
// 					],
// 					__v: 0,
// 					createdAt: "2024-05-23T22:02:01.212Z",
// 					updatedAt: "2024-05-23T22:02:01.212Z",
// 				},
// 				{
// 					_id: "664fbcd87fc800477172a042",
// 					userId: "664fbcd87fc800477172a03c",
// 					firstName: "Carly",
// 					lastName: "Vowel",
// 					location: "Chicago, IL",
// 					description:
// 						"Just a short description. I'm tired of typing. I'm going to play video games now.",
// 					picturePath: "post5.jpeg",
// 					userPicturePath: "p8.jpeg",
// 					likes: {
// 						"664fbcd87fc800477172a037": true,
// 						"664fbcd87fc800477172a039": true,
// 						"664fbcd87fc800477172a03b": true,
// 						"664fbcd87fc800477172a03d": true,
// 					},
// 					comments: [
// 						"I lied again, one more random comment",
// 						"Why am I doing this?",
// 						"Man I'm bored",
// 						"What should I do?",
// 						"I'm going to play video games",
// 					],
// 					__v: 0,
// 					createdAt: "2024-05-23T22:02:01.212Z",
// 					updatedAt: "2024-05-23T22:02:01.212Z",
// 				},
// 				{
// 					_id: "664fbcd87fc800477172a043",
// 					userId: "664fbcd87fc800477172a03d",
// 					firstName: "Jessica",
// 					lastName: "Dunn",
// 					location: "Washington, DC",
// 					description:
// 						"For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
// 					picturePath: "post6.jpeg",
// 					userPicturePath: "p9.jpeg",
// 					likes: { "664fbcd87fc800477172a037": true, "664fbcd87fc800477172a038": true },
// 					comments: [
// 						"Can I play video games now?",
// 						"No let's actually study",
// 						"Never mind, I'm going to play video games",
// 						"Stop it.",
// 						"Michael, stop it.",
// 					],
// 					__v: 0,
// 					createdAt: "2024-05-23T22:02:01.212Z",
// 					updatedAt: "2024-05-23T22:02:01.212Z",
// 				},
// 				{
// 					_id: "6667cd18fc3ff30613b0098e",
// 					userId: "665bd84b2dd8db1691e48ee3",
// 					firstName: "1234",
// 					lastName: "1234",
// 					location: "1234",
// 					description: "test",
// 					likes: {},
// 					comments: [],
// 					createdAt: "2024-06-11T04:05:44.139Z",
// 					updatedAt: "2024-06-11T04:05:44.139Z",
// 					__v: 0,
// 				},
// 				{
// 					_id: "6667cd40fc3ff30613b00992",
// 					userId: "665bd84b2dd8db1691e48ee3",
// 					firstName: "1234",
// 					lastName: "1234",
// 					location: "1234",
// 					description: "Here is an image",
// 					picturePath: "ew.jpg",
// 					likes: {},
// 					comments: [],
// 					createdAt: "2024-06-11T04:06:24.691Z",
// 					updatedAt: "2024-06-11T04:06:24.691Z",
// 					__v: 0,
// 				},
// 			],
// 		},
// 	}
// );
