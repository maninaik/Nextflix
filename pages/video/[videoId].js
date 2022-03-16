import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import NavBar from '../../components/navbar';
import clsx from 'classnames';
import { getVideosById } from '../../lib/videos';

Modal.setAppElement('#__next');

export async function getStaticProps({ params }) {
	const videoId = params.videoId;
	const videoData = await getVideosById(params.videoId);

	return {
		props: { video: videoData.length > 0 ? videoData[0] : {} },
		revalidate: 10,
	};
}

export function getStaticPaths() {
	const listOfVideos = ['CaimKeDcudo'];

	const paths = listOfVideos.map((videoId) => ({
		params: { videoId },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}
export default function Video({ video }) {
	const videoId = video.videoId;

	const { title, publishTime, description, channelTitle, viewCount } = video;

	return (
		<div className={styles.container}>
			<NavBar />
			<Modal
				isOpen={true}
				onRequestClose={() => router.back()}
				overlayClassName={styles.overlay}
				className={styles.modal}>
				<iframe
					id='ytplayer'
					className={styles.videoPlayer}
					type='text/html'
					width='100%'
					height='360'
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://nextflix.com&controls=0`}
					frameborder='0'></iframe>

				<div className={styles.modalBody}>
					<div className={styles.modalBodyContent}>
						<div className={styles.col1}>
							<p className={styles.publishTime}>{publishTime}</p>
							<p className={styles.title}>{title}</p>
							<p className={styles.description}>{description}</p>
						</div>

						<div className={styles.col2}>
							<p className={clsx(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>Cast: </span>
								<span className={styles.channelTitle}>{channelTitle}</span>
							</p>
							<p className={clsx(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>View Count: </span>
								<span className={styles.channelTitle}>{viewCount}</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
