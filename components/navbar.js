import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { magic } from '../lib/magic-link';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
	const router = useRouter();
	const [showDropdown, setShowDropdown] = useState(false);
	const [username, setUsername] = useState('');

	useEffect(() => {
		async function getUsername() {
			try {
				const { email } = await magic.user.getMetadata();
				setUsername(email);
			} catch (error) {
				console.error('Something went wrong with sign in', error);
			}
		}
		getUsername();
	}, []);

	const handleOnClickHome = (e) => {
		e.preventDefault();
		router.push('/');
	};
	const handleOnClickMyList = (e) => {
		e.preventDefault();
		router.push('/browse/my-list');
	};
	const handleOnClickUsername = (e) => {
		setShowDropdown(!showDropdown);
	};

	const handleSignOut = async (e) => {
		try {
			await magic.user.logout();
			console.log(await magic.user.isLoggedIn());
			router.push('/login');
		} catch (err) {
			console.error('Something went wrong logging in', err);
			router.push('/login');
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<a className={styles.logoLink} href=''>
					<div className={styles.logoWrapper}>
						<Image
							src='/static/nextflix.svg'
							width='120px'
							height='60px'
							alt='Nextflix logo'
						/>
					</div>
				</a>
				<ul className={styles.navItems}>
					<li onClick={handleOnClickHome} className={styles.navItem}>
						Home
					</li>
					<li onClick={handleOnClickMyList} className={styles.navItem2}>
						My List
					</li>
				</ul>
				<nav className={styles.navContainer}>
					<div>
						<button
							onClick={handleOnClickUsername}
							className={styles.usernameBtn}>
							<p className={styles.username}>{username}</p>
							{/* expand more icon */}
							<Image
								src='/static/expand-more.svg'
								alt='expand icon'
								height='24px'
								width='24px'
							/>
						</button>
						{showDropdown && (
							<div className={styles.navDropdown}>
								<div>
									<a onClick={handleSignOut} className={styles.linkName}>
										Sign out
									</a>
									<div className={styles.linewWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
