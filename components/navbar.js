import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = (props) => {
	const { username } = props;
	const router = useRouter();
	const [showDropdown, setShowDropdown] = useState(false);

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

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<a className={styles.logoLink} href=''>
					<Image
						src='/static/nextflix.svg'
						width='120px'
						height='60px'
						alt='Nextflix logo'
					/>
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
									<Link href='/login'>
										<a className={styles.linkName}>Sign out</a>
									</Link>
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
