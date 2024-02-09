import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "My GPT Assistant",
	description: "Custom GPT Assistant to help you with your daily tasks.",
	icons: {
		icon: "/favicon.ico",
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={`bg-slate-800 ${inter.className}`}>{children}</body>
		</html>
	)
}
