import jwt from 'jsonwebtoken';

export function verifyToken(token) {
	if (!token) return null;
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

	return decodedToken?.issuer;
}
