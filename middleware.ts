// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Configuración CORS para APIs
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400');

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: Object.fromEntries(response.headers),
      });
    }
  }

  // Protección de rutas
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard')

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/auth/:path*'
  ],
};