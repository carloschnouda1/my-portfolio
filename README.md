# Carlos Chnouda — Portfolio

Personal portfolio built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS.

**Live:** https://my-portfolio-three-jet-86.vercel.app

## Features

- Animated hero with a terminal-style intro and a canvas background
- Projects, services and skills sections driven by typed data files in `src/data/`
- Contact form that sends email through Gmail SMTP (Nodemailer) and stores submissions in MongoDB
- AI assistant chat powered by the OpenAI API
- Responsive layout, Framer Motion transitions, generated icons, manifest, robots and sitemap

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Backend**: Next.js route handlers, Nodemailer, MongoDB, OpenAI SDK
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.18+ (20+ recommended)
- npm

### Installation

```bash
git clone https://github.com/carloschnouda1/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The contact form and AI assistant need environment variables in `.env.local`. See [EMAIL_SETUP.md](EMAIL_SETUP.md) for the email and database setup.

## Project Structure

```
src/app/         Routes, API route handlers, metadata
src/components/  Page sections and UI primitives
src/data/        Projects, services and skills content
src/utils/       Email, database and motion helpers
```

## Deployment

Deployed on Vercel. Import the repository and add the environment variables from `EMAIL_SETUP.md` in the project settings.

## License

Released under the [MIT License](LICENSE).

## Contact

**Carlos Chnouda**

- GitHub: [carloschnouda1](https://github.com/carloschnouda1)
- LinkedIn: [carloschnouda](https://www.linkedin.com/in/carloschnouda)
- Portfolio: [carloschnouda.info](https://www.carloschnouda.info)
