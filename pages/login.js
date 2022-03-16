import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/login.module.css';
import { magic } from '../lib/magic-link';

export default function login() {
	const [email, setEmail] = useState('');
	const [userMessage, setUserMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => {
			setIsLoading(false);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		router.events.on('routeChangeError', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
			router.events.on('routeChangeError', handleRouteChange);
		};
	}, [router]);

	const handleOnChangeEmail = (e) => {
		setUserMessage('');
		setEmail(e.target.value);
	};

	const handleLoginEmail = async (e) => {
		e.preventDefault();
		if (email) {
			try {
				setIsLoading(true);
				const didToken = await magic.auth.loginWithMagicLink({ email });
				if (didToken) router.push('/');
			} catch (error) {
				console.error('Something went wrong logging in', error);
			}
		} else {
			setUserMessage('Please enter an Email');
			setIsLoading(false);
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
					<button
						type='submit'
						className={styles.loginBtn}
						onClick={handleLoginEmail}>
						{isLoading ? 'Loading...' : 'Sign In'}
					</button>
				</div>
			</main>
		</div>
	);
}
