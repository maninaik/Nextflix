import React from 'react';
import Card from './card';
import styles from '../styles/section-cards.module.css';
import clsx from 'classnames';
import { useRef } from 'react';

const SectionCards = ({
	shouldWrap = false,
	title,
	videos = [],
	size,
	shouldScale = true,
}) => {
	const sliderRef = useRef(null);
	const handleLeftSlide = () => {
		sliderRef.current.scrollLeft -= sliderRef.current.clientWidth / 2;
		console.log(sliderRef);
	};
	const handleRightSlide = () => {
		sliderRef.current.scrollLeft += sliderRef.current.clientWidth / 2;
	};
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
				<span onClick={handleLeftSlide} className={styles.leftSlide}>
					<b className='material-icons'></b>
				</span>
				<div id='slider' className={styles.slider} ref={sliderRef}>
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

				<span onClick={handleRightSlide} className={styles.rightSlide}>
					<b className='material-icons'></b>
				</span>
			</div>
		</section>
	);
};

export default SectionCards;
