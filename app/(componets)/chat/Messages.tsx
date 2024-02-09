import { useEffect, useRef } from "react"
import Markdown from "react-markdown"

export default function Messages({
	messages,
	awaitAiResponse,
}: {
	messages: { role: string; content: string }[]
	awaitAiResponse: boolean
}) {
	const lastMessageRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		console.log("lastMessageRef", lastMessageRef)
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	return (
		<div className='flex flex-col gap-2 w-full overflow-y-auto p-12'>
			{messages.length === 0 && (
				<p className='text-center text-gray-500'>No messages yet</p>
			)}
			{messages.map((message, index) => (
				<Message key={index} message={message} />
			))}
			{awaitAiResponse && (
				<Message message={{ role: "system", content: "..." }} />
			)}
			<div ref={lastMessageRef} />
		</div>
	)
}

const Message = ({
	message,
}: {
	message: { role: string; content: string }
}) => {
	return (
		<div
			className={`relative flex ${
				message.role === "user" ? "justify-end" : ""
			}`}
		>
			<div
				className={`px-4 py-2 rounded-lg ${
					message.role === "user"
						? "bg-blue-500 text-white ml-[10%]"
						: "bg-gray-200 mr-[10%]"
				}`}
			>
				<Markdown>{message.content}</Markdown>
			</div>
			<span
				className={`absolute bottom-0 w-0 h-0 border-b-[1em] border-l-[1em] border-l-transparent border-r-[1em] border-r-transparent ${
					message.role === "user"
						? "border-blue-500 right-[-0.5rem]"
						: "border-gray-200 left-[-0.5rem]"
				}`}
			/>
		</div>
	)
}
