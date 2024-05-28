import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {

  const token = req.cookies.get('@aec.token')?.value;  

  const signInURL = new URL('/', req.url);
  const dashboardURL = new URL('/dashboard', req.url);

  if(!token){

    if(req.nextUrl.pathname === '/') {
      return NextResponse.next();
    }
    return NextResponse.redirect(signInURL);
  }

  if(req.nextUrl.pathname === '/'){
    return NextResponse.redirect(dashboardURL);
  }

}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/address'
  ]
}