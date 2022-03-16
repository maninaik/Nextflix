const getVideoArrHelper = (item) => ({
	title: item?.snippet?.title || null,
	imgUrl: item?.snippet?.thumbnails?.high?.url || null,
	id: item?.id?.videoId || item?.id,
});

const getVideoDetailsHelper = (item) => ({
	publishTime: item.snippet?.publishedAt,
	title: item.snippet?.title || null,
	description: item.snippet?.description || null,
	channelTitle: item.snippet?.channelTitle || null,
	viewCount: item.statistics?.viewCount || '0',
	videoId: item?.id?.videoId || item?.id,
});

const getVideos = async (url, fn) => {
	const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
	const BASE_URL = 'youtube.googleapis.com/youtube/v3';
	try {
		const response = await fetch(
			`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
		);
		const data = await response.json();

		if (data?.error) {
			console.error('youtube api error', error);
			return [];
		}

		return data.items.map((item) => {
			return fn(item);
		});
	} catch (error) {
		console.error('Something went wrong with the videos library', error);
		return [];
	}
};

export const getVideosBySearchQuery = (query) => {
	const url = `search?part=snippet&q=${query}`;
	return getVideos(url, getVideoArrHelper);
};

export const getVideosByPopularity = () => {
	const url =
		'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN';
	return getVideos(url, getVideoArrHelper);
};

export const getVideosById = (id) => {
	const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
	return getVideos(url, getVideoDetailsHelper);
};
