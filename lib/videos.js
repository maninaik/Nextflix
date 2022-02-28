const getVideos = async (url) => {
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
			return {
				title: item?.snippet?.title || null,
				imgUrl: item?.snippet?.thumbnails?.high?.url || null,
				id: item?.id?.videoId || item?.id,
			};
		});
	} catch (error) {
		console.error('Something went wrong with the videos library', error);
		return [];
	}
};

export const getVideosBySearchQuery = (query) => {
	const url = `search?part=snippet&q=${query}`;
	return getVideos(url);
};

export const getVideosByPopularity = () => {
	const url =
		'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN';
	return getVideos(url);
};
