import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Extract the domain or subdomain
  const domain = hostname.split(':')[0]; // Remove port if present
console.log(domain)
  // Map domains to paths
  const domainMap: Record<string, string> = {
    'admin.localhost': '/admin',
    'demo.localhost': '/one-seller',
    'localhost': '/default',
  };

  // Determine the path based on domain
  const appPath = domainMap[domain] || '/default';

  // Rewrite the request to the corresponding app path
  return NextResponse.rewrite(new URL(appPath + request.nextUrl.pathname, request.url));
}