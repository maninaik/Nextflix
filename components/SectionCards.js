import React from 'react';
import Card from './card';
import styles from '../styles/section-cards.module.css';
import clsx from 'classnames';

const SectionCards = ({
	shouldWrap = false,
	title,
	videos = [],
	size,
	shouldScale = true,
}) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
				{videos.map((video, index) => (
					<Card
						key={video.id}
						imgUrl={video.imgUrl}
						size={size}
						id={video.id}
						shouldScale={shouldScale}
					/>
				))}
			</div>
		</section>
	);
};

export default SectionCards;
