import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/card.module.css';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import Link from 'next/link';

const Card = (props) => {
	const {
		imgUrl = '/static/movie-placeholder.png',
		size = 'medium',
		id,
		shouldScale = true,
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

	const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
	const shouldHover = shouldScale && {
		whileHover: { ...scale },
	};
	return (
		<Link href={`/video/${id}`}>
			<div className={styles.container}>
				<motion.div
					{...shouldHover}
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
		</Link>
	);
};

export default Card;
