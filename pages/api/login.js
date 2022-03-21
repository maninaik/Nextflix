import magicAdmin from '../../lib/magic-server';
import jwt from 'jsonwebtoken';
import { createUser, getUserByIssuer } from '../../lib/db/hasura';
import { setTokenCookie } from '../../lib/cookies';
export default async function login(req, res) {
	if (req.method === 'POST') {
		try {
			const JWT_SECRET = process.env.JWT_SECRET;
			const didToken = req.headers.authorization?.substr(7);
			const metadata = await magicAdmin.users.getMetadataByToken(didToken);
			const token = jwt.sign(
				{
					...metadata,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
					'https://hasura.io/jwt/claims': {
						'x-hasura-allowed-roles': ['user'],
						'x-hasura-default-role': 'user',
						'x-hasura-user-id': `${metadata.issuer}`,
					},
				},
				JWT_SECRET
			);
			// CHECK IF USER EXISTS
			const response = await getUserByIssuer(metadata.issuer, token);
			const isNewUser = response?.data?.users?.length > 0 ? false : true;

			isNewUser &&
				(await createUser(
					metadata.email,
					metadata.issuer,
					metadata.publicAddress,
					token
				));
			//set the cookie
			setTokenCookie(token, res);
			res.send({ isNewUser, done: true });
		} catch (error) {
			console.error('Something went wrong logging in', error);
			res.status(500).send({ done: false });
		}
	} else {
		res.send({ done: false });
	}
}
