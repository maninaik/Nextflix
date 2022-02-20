import Head from 'next/head';
import Banner from '../components/banner';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1>Nextflix</h1>

			<Banner
				title='3 idiots'
				subTitle='A movie on engineering students'
				imgUrl='/static/banner-image.jpg'
			/>
		</div>
	);
}
