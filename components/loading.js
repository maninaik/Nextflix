import styles from '../styles/loading.module.css';

export default function Loading() {
	return (
		<div className={styles.container}>
			<div className={styles.loader}>Loading...</div>
		</div>
	);
}
