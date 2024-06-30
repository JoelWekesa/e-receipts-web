export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/", "/stores/all", "/stores/add"],
}