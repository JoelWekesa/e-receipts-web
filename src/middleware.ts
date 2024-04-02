import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default authMiddleware({

    publicRoutes: ["/register", "/contact", "/", "/sign-in", "/sign-up"],
    debug: true,
    afterAuth(auth, req, evt) {
        return NextResponse.next();
    }
});
