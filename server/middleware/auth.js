import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	try {
		let token = req.header("Authorization");

		// If token isn't sent:
		if (!token) {
			return res.status(403).send("Access Denied");
		}

		// If token is sent:
		if (token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length).trimLeft();
		}

		// Verify token
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;

		// Go to next middleware
		next();
	} catch (error) {
		console.log(error);
	}
};
