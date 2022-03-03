import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';
import { magic } from '../lib/magic-link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	const loadPage = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		async function checkLogin() {
			const isLoggedIn = await magic.user.isLoggedIn();
			router.events.on('routeChangeComplete', loadPage);
			router.events.on('routeChangeError', loadPage);

			if (isLoggedIn) {
				router.push('/');
			} else {
				router.push('/login');
			}
		}
		checkLogin();

		return () => {
			router.events.off('routeChangeComplete', loadPage);
			router.events.off('routeChangeError', loadPage);
		};
	}, []);

	return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
