import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from "jsonwebtoken";
import axios, { AxiosRequestConfig } from "axios";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {

                if (!credentials) {
                    return null
                }

                const url = 'http://localhost:5600/auth/login'

                const config: AxiosRequestConfig = {
                    method: 'POST',
                    url,
                    data: {
                        username: credentials.username,
                        password: credentials.password
                    }
                }

                const response = await axios(config).then(res => res.data)

                if (!response) {
                    return null
                }

                return response
            }
        })
    ],



    pages: {
        signIn: '/auth/login',
    },

    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60 * 30 // 30 days
    },




    callbacks: {
        async jwt({ token, user }) {
            if (user) {

                const accessToken = await jwt.sign({ id: user.id }, process.env.NEXTAUTH_SECRET || '', { expiresIn: '30d' })

                token.id = user.id

                token.image = user.image

                token.accessToken = accessToken
            }
            return { ...token, ...user }
        },
        async session({ session, token }) {

            const url = 'http://localhost:5600/auth'

            const config: AxiosRequestConfig = {
                method: 'POST',
                url,
                data: {
                    id: token.id,
                    name: session?.user?.name,
                    email: session?.user?.email,
                    image: session?.user?.image,
                    picture: token.picture,
                    jti: session.jti,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.accessToken
                }
            }

            await axios(config)

            return { ...session, ...token }
        }
    },

    // session: {
    //     strategy: 'jwt'
    // },

    // jwt: {
    //     secret: process.env.NEXT_JWT_SECRET || '',
    //     maxAge: 24 * 60 * 60 * 30 // 30 days
    // },


}