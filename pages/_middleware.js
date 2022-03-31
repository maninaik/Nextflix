import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';

export function middleware(req, ev) {
	const token = req.cookies?.token || null;
	const userId = verifyToken(token);
	const { pathname } = req.nextUrl;
	console.log({ pathname });
	if (
		userId ||
		pathname.includes('/api/login') ||
		pathname.includes('/static')
	) {
		console.log('herer');
		return NextResponse.next();
	}

	if (!token && pathname !== '/login') {
		console.log('redirected');
		const url = req.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.rewrite(url);
	}
}
