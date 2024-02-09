import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.MY_OPENAI_API_KEY,
});

export async function POST(request: Request) {
	const { messages } = await request.json();

	const completion = await openai.chat.completions.create({
		messages: messages,
		// model: "gpt-4-turbo-preview",
		model: "gpt-3.5-turbo",
		max_tokens: 1000,
	});

	console.log(completion);

	return NextResponse.json({ content: completion.choices[0].message.content });
}