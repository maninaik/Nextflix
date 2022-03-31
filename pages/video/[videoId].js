import Modal from 'react-modal';
import styles from '../../styles/video.module.css';
import NavBar from '../../components/navbar';
import clsx from 'classnames';
import { getVideosById } from '../../lib/videos';
import Like from '../../components/icons/like-icon';
import DisLike from '../../components/icons/dislike-icon';
import { useState, useEffect } from 'react';

Modal.setAppElement('#__next');

export async function getStaticProps({ params }) {
	const videoId = params.videoId;
	const videoData = await getVideosById(videoId);

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

	const [toggleLike, setToggleLike] = useState(false);
	const [toggleDislike, setToggleDislike] = useState(false);

	useEffect(() => {
		async function getVideoData() {
			const response = await fetch(`/api/stats?videoId=${videoId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const videoDetails = await response.json();
			const { favourited } = videoDetails;
			if (favourited) {
				setToggleLike(true);
			} else {
				setToggleDislike(true);
			}
		}
		getVideoData();
	}, []);

	const rateVideo = async (favourited) => {
		return await fetch('/api/stats', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				videoId,
				favourited,
			}),
		});
	};

	const handleToggleLike = async () => {
		const val = !toggleLike;
		setToggleLike((prev) => !prev);
		setToggleDislike(toggleLike);

		const favourited = val ? 1 : 0;
		const response = await rateVideo(favourited);
	};
	const handleToggleDislike = async () => {
		const val = !toggleDislike;
		setToggleDislike((prev) => !prev);
		setToggleLike(toggleDislike);

		const favourited = val ? 0 : 1;
		const response = await rateVideo(favourited);
	};

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
					frameBorder='0'></iframe>
				<div className={styles.likeDislikeBtnWrapper}>
					<div className={styles.likeBtnWrapper}>
						<button onClick={handleToggleLike}>
							<div className={styles.btnWrapper}>
								<Like selected={toggleLike} />
							</div>
						</button>
					</div>

					<button onClick={handleToggleDislike}>
						<div className={styles.btnWrapper}>
							<DisLike selected={toggleDislike} />
						</div>
					</button>
				</div>

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
