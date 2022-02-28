import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/login.module.css';

export default function login() {
	const [email, setEmail] = useState('');
	const [userMessage, setUserMessage] = useState('');
	const router = useRouter();

	const handleOnChangeEmail = (e) => {
		setUserMessage('');
		setEmail(e.target.value);
	};

	const handleLoginEmail = (e) => {
		e.preventDefault();
		if (email) {
			router.push('/');
		} else {
			setUserMessage('Please enter an Email');
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Nextflix Sign In</title>
			</Head>

			<header className={styles.header}>
				<div className={styles.headerWrapper}>
					<a className={styles.logoLink} href=''>
						<div className={styles.logoWrapper}>
							<Image
								src='/static/nextflix.svg'
								alt='Nextflix logo'
								width='128px'
								height='34px'
							/>
						</div>
					</a>
				</div>
			</header>

			<main className={styles.main}>
				<div className={styles.mainWrapper}>
					<h1 className={styles.signinHeader}>Sign In</h1>

					<input
						className={styles.emailInput}
						type='text'
						placeholder='Email Address'
						onChange={handleOnChangeEmail}
					/>

					<p className={styles.userMsg}>{userMessage}</p>
					<button className={styles.loginBtn} onClick={handleLoginEmail}>
						Sign In
					</button>
				</div>
			</main>
		</div>
	);
}
