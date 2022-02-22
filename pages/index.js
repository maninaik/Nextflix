import Head from 'next/head';
import Banner from '../components/banner';
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Nextflix</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar username='maninaik@naik.com' />

			<Banner
				title='3 idiots'
				subTitle='A movie on engineering students'
				imgUrl='/static/banner-image.jpg'
			/>
		</div>
	);
}
