import { NextResponse } from 'next/server';
const jwt = require('@tsndr/cloudflare-worker-jwt'); //light weight jwt bcz middleware is an edge func

export async function middleware(req) {
	const token = req.cookies?.token || null;
	let userId;
	if (token) {
		userId = await jwt.verify(token, process.env.JWT_SECRET);
	}
	const { pathname } = req.nextUrl;
	if (
		userId ||
		pathname.includes('/api/login') ||
		pathname.includes('/static')
	) {
		return NextResponse.next();
	}

	if (!token && pathname !== '/login') {
		const url = req.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.rewrite(url);
	}
}
