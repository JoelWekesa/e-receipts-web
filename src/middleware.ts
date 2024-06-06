import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default authMiddleware({
    // debug: true,
    publicRoutes: ["/register", "/contact", "/", "/templates/supermarket", "/maps"],
    afterAuth(auth, req, evt) {
        // Handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }

        if (auth.userId && !auth.isPublicRoute) {
            const res = NextResponse.next()

            res.cookies.set('clerk_session', auth.sessionId)
            return res
        }

        return NextResponse.next();
    },
});
