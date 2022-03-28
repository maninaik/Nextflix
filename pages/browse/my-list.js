import NavBar from '../../components/navbar';
import SectionCards from '../../components/SectionCards';
import { verifyToken } from '../../lib/utils';
import styles from '../../styles/myList.module.css';
import Head from 'next/head';
import { getFavouritedVideos } from '../../lib/videos';
export async function getServerSideProps({ req }) {
	const token = req.cookies.token || null;
	const userId = verifyToken(token);
	if (!userId)
		return { props: {}, redirect: { destination: '/login', permanent: false } };
	const favouritedVideos = await getFavouritedVideos(userId, token);
	return {
		props: {
			favouritedVideos,
		},
	};
}
export default function MyList({ favouritedVideos }) {
	return (
		<div>
			<Head>
				<title>My List</title>
			</Head>
			<main className={styles.main}>
				<NavBar />
				<div className={styles.sectionWrapper}>
					<SectionCards
						title=''
						videos={favouritedVideos}
						size='small'
						shouldWrap={true}
						shouldScale={false}
					/>
				</div>
			</main>
		</div>
	);
}
