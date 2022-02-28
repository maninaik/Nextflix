import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/card.module.css';
import { motion } from 'framer-motion';
import classnames from 'classnames';

const Card = (props) => {
	const {
		imgUrl = '/static/movie-placeholder.png',
		size = 'medium',
		key,
	} = props;

	const [imgSrc, setImgSrc] = useState(imgUrl);
	const handleOnError = () => {
		setImgSrc('/static/movie-placeholder.png');
	};

	const classMap = {
		large: styles.lgItem,
		medium: styles.mdItem,
		small: styles.smItem,
	};

	const scale = key === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
	return (
		<div className={styles.container}>
			<motion.div
				whileHover={scale}
				className={classnames(styles.imgMotionWrapper, classMap[size])}>
				<Image
					className={styles.cardImg}
					src={imgSrc}
					alt='image'
					layout='fill'
					onError={handleOnError}
				/>
			</motion.div>
		</div>
	);
};

export default Card;
