import Head from 'next/head';
import Banner from '../components/banner';
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';
import SectionCards from '../components/SectionCards';
import { startFetchMyQuery } from '../lib/db/hasura';
import {
	getVideosById,
	getVideosByPopularity,
	getVideosBySearchQuery,
} from '../lib/videos';
export async function getServerSideProps() {
	const disneyVideos = await getVideosBySearchQuery('disney trailer');
	const productivityVideos = await getVideosBySearchQuery('productivity');
	const travelVideos = await getVideosBySearchQuery('travel');
	const popularVideos = await getVideosByPopularity();
	const bannerVideoArr = await getVideosById('CaimKeDcudo');
	const bannerVideo = bannerVideoArr.length > 0 ? bannerVideoArr[0] : {};
	return {
		props: {
			disneyVideos,
			productivityVideos,
			travelVideos,
			popularVideos,
			bannerVideo,
		},
	};
}

export default function Home({
	disneyVideos,
	productivityVideos,
	travelVideos,
	popularVideos,
	bannerVideo,
}) {
	startFetchMyQuery();
	return (
		<div className={styles.container}>
			<Head>
				<title>Nextflix</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className={styles.main}>
				<Navbar />

				<Banner
					title={bannerVideo.title || ''}
					subTitle=''
					imgUrl='/static/banner-image.jpg'
					videoId='CaimKeDcudo'
				/>
				<div className={styles.sectionWrapper}>
					<SectionCards title='Disney' videos={disneyVideos} size='large' />
					<SectionCards title='Travel' videos={travelVideos} size='small' />
					<SectionCards
						title='Productivity'
						videos={productivityVideos}
						size='medium'
					/>
					<SectionCards title='Popular' videos={popularVideos} size='small' />
				</div>
			</div>
		</div>
	);
}
