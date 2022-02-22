import Image from 'next/image';
import styles from '../styles/Banner.module.css';

export default function Banner(props) {
	const { title, subTitle, imgUrl } = props;

	const handleOnPlay = () => {
		console.log('play button');
	};
	return (
		<div className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.left}>
					<h2 className={styles.title}>{title}</h2>
					<h3 className={styles.subTitle}>{subTitle}</h3>

					<div className={styles.playBtnWrapper}>
						<button className={styles.btnWithIcon} onClick={handleOnPlay}>
							<Image
								src='/static/play-arrow.svg'
								alt='play icon'
								width='32px'
								height='32px'
							/>
							<span className={styles.playText}>Play</span>
						</button>
					</div>
				</div>
			</div>

			<div
				className={styles.bannerImage}
				style={{
					backgroundImage: `url("${imgUrl}")`,
					width: '100%',
					height: '100%',
					position: 'absolute',
					backgroundSize: 'cover',
					backgroundPosition: '50% 50%',
				}}></div>
		</div>
	);
}
