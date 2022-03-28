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

export async function findVideoStatsById(videoId, issuer, token) {
	const operationsDoc = `query getStats($issuer: String!, $videoId: String!) {
		stats(where: {userId: {_eq: $issuer}, _and: {videoId: {_eq: $videoId}}}) {
		  userId
		  videoId
		  watched
		  id
		  favourited
		}
	  }`;

	return await executeGraphQL(
		operationsDoc,
		'getStats',
		{
			videoId,
			issuer,
		},
		token
	);
}

export async function createStatsForIssuer(
	{ issuer, videoId, favourited = 0, watched = true },
	token
) {
	const operationsDoc = `	mutation createStats($issuer: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
			insert_stats_one(object: {favourited: $favourited, userId: $issuer, videoId: $videoId, watched: $watched}) {
			favourited
			id
			userId
			videoId
			watched
			}
		}`;

	return await executeGraphQL(
		operationsDoc,
		'createStats',
		{
			videoId,
			issuer,
			favourited,
			watched,
		},
		token
	);
}

export async function updateStats(
	{ issuer, videoId, favourited, watched },
	token
) {
	const operationsDoc = `
		mutation updateStats($issuer: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
			update_stats(where: {
				userId: {_eq: $issuer}, 
				videoId: {_eq: $videoId}
			}, 
			_set: {favourited: $favourited, watched: $watched}) {
				returning {
					favourited,
					userId,
					videoId,
					watched
				}
			}
		}
		`;

	return await executeGraphQL(
		operationsDoc,
		'updateStats',
		{
			issuer,
			videoId,
			favourited,
			watched,
		},
		token
	);
}

export async function getVideosByWatched(issuer, token) {
	const operationsDoc = `
		query videosWatched($issuer: String!) {
			stats(where: {userId: {_eq: $issuer}, watched: {_eq: true}}) {
			userId
			videoId
			watched
			}
		}`;
	return await executeGraphQL(
		operationsDoc,
		'videosWatched',
		{ issuer },
		token
	);
}

export async function getVideosByFavourited(issuer, token) {
	const operationsDoc = `
		query videosFavourited($issuer: String!) {
			stats(where: {favourited: {_eq: 1}, userId: {_eq: $issuer}}) {
			videoId
			watched
			id
			favourited
			}
		}
		`;
	return await executeGraphQL(
		operationsDoc,
		'videosFavourited',
		{ issuer },
		token
	);
}
