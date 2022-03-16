import React from 'react';
import Card from './card';
import styles from '../styles/section-cards.module.css';
import Link from 'next/link';

const SectionCards = ({ title, videos = [], size }) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.cardWrapper}>
				{videos.map((video, index) => (
					<Card
						key={video.id}
						imgUrl={video.imgUrl}
						size={size}
						id={video.id}
					/>
				))}
			</div>
		</section>
	);
};

export default SectionCards;
