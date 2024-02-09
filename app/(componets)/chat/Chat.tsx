"use client"

import { useRef, useState } from "react"
import Messages from "./Messages"
import Settings from "../Settings"

export default function Chat() {
	const [awaitAiResponse, setAwaitAiResponse] = useState(false)
	const [messages, setMessages] = useState<
		{ role: string; content: string }[]
	>([])
	const refUserMessage = useRef<HTMLTextAreaElement>(null)

	const handleSubmit: React.FormEventHandler = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const message = (formData.get("message") as string) || ""

		sendMessage(message)
	}

	const sendMessage = async (message: string) => {
		if (refUserMessage.current) {
			refUserMessage.current.value = "" // clear input
			refUserMessage.current.focus()
		}

		message = message.trim()
		if (message === "") {
			return
		}

		const currentMessage = { role: "user", content: message }
		setMessages((prev) => [...prev, currentMessage])
		setAwaitAiResponse(true)

		const res = await fetch("/api/makeRequest", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ messages: [...messages.slice(-5), currentMessage] }),
		})

		setAwaitAiResponse(false)

		if (res.status !== 200) {
			setMessages((prev) => [
				...prev,
				{ role: "system", content: "Something went wrong" },
			])
			return
		}

		const data = await res.json()

		setMessages((prev) => [
			...prev,
			{ role: "system", content: data.content },
		])
	}

	return (
		<div className='flex h-screen w-screen flex-col items-center justify-between'>
			{/* <Settings /> */}
			<Messages messages={messages} awaitAiResponse={awaitAiResponse} />
			<form onSubmit={handleSubmit} className='w-full p-12'>
				<div className='border rounded p-4 w-full grid grid-cols-[1fr_auto] gap-2'>
					<textarea
						name='message'
						ref={refUserMessage}
						className='bg-transparent focus-visible:outline-none text-white resize-none'
						placeholder='Type your message here...'
						autoFocus={true}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault()
								sendMessage(refUserMessage.current?.value || "")
							}
						}}
					/>
					<button
						type='submit'
						className='py-2 px-8 rounded bg-cyan-700 text-white'
					>
						Send
					</button>
				</div>
			</form>
		</div>
	)
}
