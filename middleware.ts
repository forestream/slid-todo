import { NextRequest, NextResponse } from 'next/server';
import { fetchNewAccessToken } from './lib/api/refreshToken';
import { API_BASE_URL } from './constants';
import setAuthCookies from './lib/utils/setAuthCookies';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // 이미 로그인한 사용자가 접근하면 안 되는 페이지 목록
  const guestOnlyPages = new Set(['/login', '/signup']);
  // 이미 로그인한 사용자만 접근할 수 있는 페이지 목록
  const userOnlyPages = ['/dashboard', '/todos', '/goals', '/notes'];
  const isMainPage = pathname === '/';
  // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근하는 경우
  if (guestOnlyPages.has(pathname) || isMainPage) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 로그인하지 않은 사용자가 접근하면 안 되는 페이지 목록
  if (userOnlyPages.some((page) => pathname.startsWith(page))) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // /todos 나 /goals 하위 경로 접근 시 액세스토큰이 만료되었을 때
  if ((pathname.startsWith('/todos') || pathname.startsWith('/goals')) && !accessToken && refreshToken) {
    const data = await fetchNewAccessToken(refreshToken, API_BASE_URL!);

    const response = setAuthCookies(new NextResponse(), data.accessToken, data.refreshToken);

    return NextResponse.redirect(request.url, { headers: response.headers });
  }

  if (pathname.startsWith('/4-4-dev')) {
    if (!accessToken && refreshToken) {
      const data = await fetchNewAccessToken(refreshToken, API_BASE_URL!);
      if (data) {
        request.headers.set('Authorization', `Bearer ${data.accessToken}`);

        const response = NextResponse.rewrite(new URL(`${pathname}${search}`, API_BASE_URL), {
          request: {
            headers: request.headers,
          },
        });
        setAuthCookies(response, data.accessToken, data.refreshToken);
        return response;
      }
    }

    request.headers.set('Authorization', `Bearer ${accessToken}`);

    return NextResponse.rewrite(new URL(`${pathname}${search}`, API_BASE_URL), {
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    '/4-4-dev/:path*',
    '/login',
    '/signup',
    '/dashboard',
    '/todos/:path*',
    '/goals/:path*',
    '/notes/:path*',
    '/',
  ],
};
