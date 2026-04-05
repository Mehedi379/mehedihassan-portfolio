# Mehedi Hassan - Portfolio

A modern, professional personal portfolio website with 3D graphics and smooth animations built with React, Tailwind CSS, React Three Fiber, and Framer Motion.

## 🚀 Features

### 3D Elements
- **Interactive Hero Section**: Rotating sphere with distortion animation using React Three Fiber
- **Floating Skills Cloud**: 3D rotating skill badges with smooth animations
- **Particle Background**: Animated particles in the About section
- **3D Tilt Cards**: Project cards with 3D hover effects

### Animations
- Smooth fade-in and slide-up animations for all sections
- Subtle floating effects on interactive elements
- Gradient text animations
- Hover transformations with scale and rotation
- Smooth scroll behavior

### Sections
1. **Hero**: Eye-catching introduction with 3D sphere and call-to-action buttons
2. **About**: Personal information with particle background and statistics
3. **Skills**: Interactive 3D floating skill badges
4. **Projects**: Project showcase with 3D tilt cards
5. **Contact**: Contact form with animated buttons and social links

### Design
- Minimal color palette (white, gray, black, blue-purple gradient accents)
- Clean typography with Inter font
- Responsive design (mobile-first approach)
- Dark mode support with localStorage persistence
- Plenty of white space for readability

## 🛠️ Tech Stack

- **React** - UI library
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D graphics
- **@react-three/drei** - 3D helpers and components
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### Update Personal Information
Edit `src/App.jsx`:
- Name and title in Hero section
- About section content
- Contact information
- Social media links
- Projects data

### Modify 3D Elements
- **Hero Sphere**: `src/components/Hero3D.jsx`
- **Skills Badges**: `src/components/Skills3D.jsx`
- **Particles**: `src/components/ParticlesBackground.jsx`

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#3B82F6',    // Blue
  secondary: '#8B5CF6',  // Purple
}
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## ⚡ Performance

- Optimized 3D rendering with proper canvas sizing
- Lazy loading for 3D components
- Efficient animations with Framer Motion
- Minimized bundle size with Vite

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Mehedi Hassan**
- Location: Bangladesh
- Title: CSE Student | Problem Solver | Developer

---

Built with ❤️ using React, Three.js, and Tailwind CSS
