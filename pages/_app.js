import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';
import { magic } from '../lib/magic-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const loadPage = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		router.events.on('routeChangeComplete', loadPage);
		router.events.on('routeChangeError', loadPage);

		return () => {
			router.events.off('routeChangeComplete', loadPage);
			router.events.off('routeChangeError', loadPage);
		};
	}, [router]);

	return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
