export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard",
        "/accept-invite/:accept*",
        "/orders/:id*",
        "/shop/checkout/:name*",
        "/inventory/:id*",
        "/inventory",
        "/myteams",
        "/myteams/:id*",
        "/orders",
        "/orders/:id*",
        "/receipts",
        "/receipts/:id*",
        "/settings",
        "/store",
        "/store/:id*",
        "/stores",
        "/stores/:id*",
    ],
}