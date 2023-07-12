import { NextRequest, NextResponse } from 'next/server';
import useUserStore from '@/core/store/UserStore';

async function middleware(req: NextRequest) {
  const { token } = useUserStore();
  console.log("Token::", token)
  if (token === undefined) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }
  NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
