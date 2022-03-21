/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function executeGraphQL(operationsDoc, operationName, variables, token) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});

	return await result.json();
}

export async function getUserByIssuer(issuer, token) {
	const operationsDoc = `
	query getUserByIssuer($issuer: String!) {
		users(where: {issuer: {_eq: $issuer}}) {
		email
		id
		issuer
		}
	}
  `;

	return await executeGraphQL(
		operationsDoc,
		'getUserByIssuer',
		{ issuer },
		token
	);
}

export async function createUser(email, issuer, publicAddress, token) {
	const operationsDoc = ` mutation createUser($email: String!, $issuer: String!, $publicAddress: String!) {
		insert_users_one(object: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
		  email
		  id
		  issuer
		}
	  }`;

	return await executeGraphQL(
		operationsDoc,
		'createUser',
		{
			email,
			issuer,
			publicAddress,
		},
		token
	);
}
