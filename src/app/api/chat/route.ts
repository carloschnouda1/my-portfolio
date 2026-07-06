import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant for Carlos Chnouda's portfolio website. You're here to help visitors learn about Carlos's skills, experience, and projects in a friendly and professional manner.

About Carlos Chnouda:
- Full Stack Engineer with 4 years of experience building dynamic, responsive web and mobile applications
- Works end-to-end: data models, APIs, and the interfaces people actually use
- Both freelances on complete builds and collaborates with teams on larger products
- Located in Lebanon
- Contact: carlos.chnouda@gmail.com
- GitHub: github.com/carloschnouda1
- LinkedIn: linkedin.com/in/carloschnouda

Key Skills:
- Frontend: Next.js, React, React Native, TypeScript, JavaScript, Tailwind CSS, Framer Motion, HTML5/CSS3
- Backend: Laravel, PHP, Node.js, REST APIs, MySQL, PostgreSQL, Auth & Sessions, CMS systems
- Tools & Practices: Git, CI/Deployment, Vercel, Performance Optimization, Responsive Design, Clean Architecture, Testing, SEO
- Core stack: Laravel, Next.js, TypeScript, React, React Native, MySQL, Node.js

Freelance Projects (built end-to-end):
1. CodeHub Solutions - Web development agency site; decoupled Laravel API with a Next.js frontend for performance and SEO
2. Revive Clinic - Clinic platform with a content-managed Laravel/PHP backend for services and team content
3. Glutes with Tracy - Fitness & personal-training platform with workout plans and progress tracking (Laravel API + Next.js)
4. Personal Portfolio - This site; a custom animated canvas background, a contact form wired to email + MongoDB, and this AI assistant

Team Projects (contributed as part of a team):
1. Manara Events (frontend & backend) - Riyadh-based events & entertainment company
2. The Quinta Group (backend) - Agriculture/horticulture supplier across Lebanon and the MENA region
3. NokNok (added features & enhanced UI) - Rapid grocery & goods delivery app in Lebanon and Ghana
4. Bullix (full rebuild, Webflow to Laravel) - Precious-metals portfolio tracker for real-time investment monitoring
5. Mustafa Al-Kadhimi (frontend & backend) - Personal platform and blog for the former Iraqi Prime Minister
6. Mabrook (backend) - Sales-incentive and rewards platform for participating brands
7. Oreyeon (backend) - Aviation-safety company with an automated runway surface monitoring system
8. StrategyHub (backend) - Qatar-based strategy and management consultancy
9. Rasmal Ventures (backend) - Qatar venture-capital firm backing early-stage companies

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
    } catch (error) {
        
        // Return more specific error message
        const errorMessage = error instanceof Error ? error.message : "Failed to process message";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
