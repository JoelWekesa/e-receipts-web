import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default authMiddleware({

    publicRoutes: ["/register", "/contact", "/", "/sign-in", "/sign-up"],
    debug: true,
    afterAuth(auth, req, evt) {
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }

        if (auth.userId && !auth.isPublicRoute) {
            const res = NextResponse.next();
            res.cookies.set("clerk_session", auth.sessionId ?? "");
            return res;
        }
        return NextResponse.next();
    }
});
