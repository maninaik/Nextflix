import { removeTokenCookie } from '../../lib/cookies';
import magicAdmin from '../../lib/magic-server';
import { verifyToken } from '../../lib/utils';

export default async function logout(req, res) {
	if (req.method === 'POST') {
		try {
			const token = req.cookies?.token;
			if (!token)
				return res.status(401).json({ message: 'User is not logged in' });

			const issuer = verifyToken(token);
			removeTokenCookie(res);
			try {
				await magicAdmin.users.logoutByIssuer(issuer);
			} catch (error) {
				console.error({
					message: 'error occured while logging out with magic',
				});
			}
			res.writeHead(302, { location: '/login' });
			res.end('');
		} catch (error) {
			console.error({ error });
			res.status(401).json({ message: 'User is already logged in' });
		}
	}
}
