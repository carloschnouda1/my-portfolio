# Carlos Chnouda - 3D Portfolio

A modern, interactive 3D portfolio website built with Next.js, React Three Fiber, and Tailwind CSS.

## Features

- **3D Interactive Background**: Animated particles and floating geometric shapes
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Modern UI**: Glassmorphism effects and gradient designs
- **Performance Optimized**: Fast loading and smooth 60fps animations

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber, Three.js
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Sections

1. **Hero**: 3D background with animated particles and call-to-action
2. **About**: Personal information and experience highlights
3. **Skills**: Interactive skill cards with progress bars
4. **Projects**: Showcase of featured work with live links
5. **Contact**: Contact form and social media links

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero.tsx` - Name, title, bio
- `src/components/About.tsx` - About section content
- `src/components/Contact.tsx` - Contact information
- `src/components/Projects.tsx` - Project details

### Colors and Theme
Modify `tailwind.config.ts` to change the color scheme and theme.

### 3D Elements
Customize 3D background elements in `src/components/canvas/` directory.

## Performance

- Optimized bundle size with tree shaking
- Lazy loading for 3D components
- Efficient re-renders with React.memo
- Image optimization with Next.js Image component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Carlos Chnouda**
- Email: carlos.chnouda@gmail.com
- GitHub: [carloschnouda](https://github.com/carloschnouda)
- LinkedIn: [carloschnouda](https://linkedin.com/in/carloschnouda)