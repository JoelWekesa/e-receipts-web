import { authMiddleware } from '@clerk/nextjs';

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default authMiddleware({
    publicRoutes: ["/register", "/contact", "/", "/sign-in", "/sign-up"],
});
