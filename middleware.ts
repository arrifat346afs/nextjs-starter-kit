import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { fetchQuery } from 'convex/nextjs';
import { NextResponse } from 'next/server';
import { api } from './convex/_generated/api';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const token = (await (await auth()).getToken({ template: "convex" }))

  const { hasActiveSubscription } = await fetchQuery(api.subscriptions.getUserSubscriptionStatus, {}, {
    token: token!,
  });

  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !hasActiveSubscription) {
    return NextResponse.redirect(new URL('/pricing', req.nextUrl.origin));
  }

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Only apply middleware to these protected routes
    '/dashboard(.*)',
  ],
}