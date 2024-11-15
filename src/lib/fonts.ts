// import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"
import { Lato as FontMono } from 'next/font/google';
import { Nunito as BodyText } from 'next/font/google';
import { Playfair_Display as HeaderText } from 'next/font/google';


export const bodyText = BodyText({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const headerText = HeaderText({
	// weight: ['100', '300', '400', '700', '900'],
	subsets: ["latin"],
	variable: "--font-sans",
})


export const fontMono = FontMono({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	variable: "--font-sans",
});
