import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant for Carlos Chnouda's portfolio website. You're here to help visitors learn about Carlos's skills, experience, and projects in a friendly and professional manner.

About Carlos Chnouda:
- Full Stack Web Developer with 4 years of experience
- Skilled in both front-end and back-end technologies
- Builds dynamic, responsive web applications from concept to deployment
- Located in Lebanon
- Contact: carlos.chnouda@gmail.com
- GitHub: github.com/carloschnouda1
- LinkedIn: linkedin.com/in/carloschnouda

Key Skills:
- Frontend: React, Next.js, JavaScript/TypeScript, HTML5, CSS3, Tailwind CSS
- Backend: PHP, Laravel, Node.js
- Database: MySQL, PostgreSQL
- Other: Git, RESTful APIs, Responsive Design, Web Performance Optimization

Notable Projects:
1. CodeHub Solutions - A comprehensive web development platform
2. Glutes with Tracy - Fitness and wellness web application
3. Revive - Healthcare/wellness platform
4. Personal Portfolio - Modern portfolio with 3D animations and AI assistant

Communication Style:
- Be concise and friendly
- Focus on Carlos's technical abilities and projects
- Encourage visitors to reach out via the contact form
- If you don't know something specific, be honest and suggest they contact Carlos directly
- Keep responses short and to the point (2-3 sentences preferred)`;

export async function POST(req: Request) {
    try {
        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY) {
            console.error("OPENAI_API_KEY is not configured");
            return NextResponse.json(
                { error: "OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file." },
                { status: 500 }
            );
        }

        const { message } = await req.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: "Invalid message format" },
                { status: 400 }
            );
        }

        console.log("Sending message to OpenAI:", message);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        console.log("OpenAI response received");

        return NextResponse.json({
            reply: completion.choices[0].message?.content || "Sorry, I couldn't generate a response.",
        });
    } catch (error: any) {
        console.error("Chat API error details:", {
            message: error?.message,
            status: error?.status,
            type: error?.type,
            error: error,
        });
        
        // Return more specific error message
        const errorMessage = error?.message || "Failed to process message";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
