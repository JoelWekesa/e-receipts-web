import NextAuth from "next-auth";
import JWT from "next-auth";

declare module "next-auth" {
    interface Session {
        name: string | null
        email: string | null
        picture: string | null
        sub: string | null
        id: string | null
        accessToken: string | null
        image: string | null
        iat: number | null
        exp: number | null
        jti: string | null

    }
}