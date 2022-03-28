import jwt from 'jsonwebtoken';
import {
	createStatsForIssuer,
	findVideoStatsById,
	updateStats,
} from '../../lib/db/hasura';
import { verifyToken } from '../../lib/utils';

export default async function stats(req, res) {
	if (req.method === 'POST') {
		try {
			if (!req.cookies?.token) {
				res.status(403).send({ error: 'Unauthorized' });
			} else {
				const issuer = verifyToken(req.cookies?.token);
				const token = req.cookies?.token;
				const { videoId, favourited = 0, watched = true } = req.body;

				if (!videoId)
					res
						.status(400)
						.send({ error: 'Bad request: please provide videoId' });
				const stats = await findVideoStatsById(videoId, issuer, token);
				if (stats?.data?.stats.length > 0) {
					//update
					const updatedStats = await updateStats(
						{ issuer, videoId, favourited, watched },
						token
					);
					res.send(
						updatedStats?.data?.update_stats?.returning?.length > 0 &&
							updatedStats.data.update_stats.returning[0]
					);
				} else {
					const newStats = await createStatsForIssuer(
						{ issuer, videoId, favourited, watched },
						token
					);
					res.send(newStats?.data?.insert_stats_one);
				}
			}
		} catch (error) {
			res.status(500).send({ done: false, error: error?.message });
		}
	} else if (req.method === 'GET') {
		try {
			if (!req.cookies?.token) {
				res.status(403).send({ error: 'Unauthorized' });
			} else {
				const token = req.cookies.token;
				const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
				const issuer = decodedToken.issuer;

				const { videoId } = req.query;

				if (!videoId)
					res
						.status(400)
						.send({ error: 'Bad request: please provide videoId' });
				const statsRes = await findVideoStatsById(videoId, issuer, token);
				const stats =
					statsRes?.data?.stats.length > 0 && statsRes.data.stats[0];
				if (stats) {
					res.send(stats);
				} else {
					res.send({ msg: 'Video not found' });
				}
			}
		} catch (error) {
			res.status(500).send({ done: false, error: error?.message });
		}
	} else {
		res.status(404).send({});
	}
}
