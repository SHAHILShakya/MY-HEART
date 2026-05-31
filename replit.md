# Replit Configuration

## Overview

This is a romantic web application built as a personal love letter/confession website. The project is designed as a heartfelt digital expression from "Shahil" to "Srashti", featuring multiple sections including love letters, confessions, poems, music, and a proposal. The application uses a full-stack architecture with a React frontend and Express backend, styled with a romantic theme using pink, purple, and gold color palettes.

## Recent Changes (November 23, 2025 - Enhanced & Perfected)

### Comprehensive Website Enhancements & Romantic Polish

**1. Typography System Refinements**
- Implemented responsive typography hierarchy with `clamp()` for fluid scaling
- Better font weights and letter spacing for elegance
- Improved line heights for readability (1.7-1.8 for body text)
- Refined heading sizes from `text-5xl/6xl` to responsive scaling

**2. Animation Enhancements**
- Slowed animations for more natural feel (6-7s float, 1.8s heartbeat, 4s glow)
- Reduced animation intensity for subtlety
- Added new `subtlePulse` animation for gentle effects
- Improved cubic-bezier timing for smoother transitions

**3. Color & Visual Harmony**
- Enhanced glass-morphism effects with better backdrop blur (20px)
- Improved romantic card shadows with better depth
- Refined gradient overlays for sophisticated look
- Better opacity and saturation values for dreamy feel

**4. Spacing & Responsive Design**
- Implemented `clamp()` for responsive section padding (3-6rem)
- Better mobile responsiveness across all components
- Improved button sizing on mobile (44px min-height)
- Added proper padding to proposal section for mobile (px-6)
- Responsive gallery grid improvements

**5. Button System Enhancements**
- Increased min-height to 48px for better accessibility
- Improved hover effects with scale + translateY combination
- Better active states with subtle scale down
- Enhanced box shadows with inset highlights for depth
- Refined transitions with cubic-bezier easing

**6. Glass Effect Elements Polish**
- Increased backdrop blur to 20px for better frosted glass look
- Better border opacity (0.7) for visibility
- Improved shadows for depth perception
- Better hover states with scale and shadow changes

**7. Micro-Interactions**
- Photo hover effects with glow shadows
- Smooth button transitions with active feedback
- Better secret dot interactions with scale animation
- Improved hint button hover states

**8. Mobile Optimization**
- Better responsive breakpoints
- Improved touch target sizes
- Better spacing on small screens
- Responsive typography with clamp()
- Fixed layout issues on mobile timeline

**9. Decorative Elements**
- Added subtle divider classes (.divider, .divider-sm)
- Improved background gradients for visual depth
- Better radial gradients for romantic atmosphere
- Refined floating background animation

**10. Overall Polish**
- Unified heading styling using new responsive system
- Better gallery section appearance
- Improved proposal section spacing
- Enhanced secret tracker UI
- Better footer appearance
- More sophisticated section backgrounds

### Music Playlist System (November 23)
- Sequential 3-song playlist with auto-play on load
- Songs play in order: Pal Pal Dil Ke Paas → Zara Zara → Kal Ho Na Ho
- Automatically loops back to first song after last
- Smooth transitions between songs

### Button System & UI Simplification
- **Unified Button Design**: Implemented .btn base class with variants (.btn-primary, .btn-secondary, .btn-ghost)
- **Music Control Button Redesign**: Reduced to small circular icon (p-3)
- **Photo Gallery Refresh**: Yellow outfit collection with all face-visible photos

### Hidden Messages System - All 8 Secrets Easily Accessible
- **Removed Code Entry System**: No secret code entry modal
- **Auto-Trigger Secrets**: Typing "yes", photo clicks, scrolling, time delays, etc.
- **Hunt Button Enhancement**: Directly reveals next unfound secret instead of hints
- **Secret Tracker UI**: Shows progress (X/8 found) with persistent localStorage storage

### Previous Changes (November 20, 2025)
- Added interactive proposal features with background music
- Created celebration system with particles (hearts + confetti)
- Implemented share & save functionality
- Full accessibility support throughout

## User Preferences

Preferred communication style: Simple, everyday language. No lengthy explanations. Focus on romantic, realistic, and natural enhancements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: TailwindCSS with custom romantic color variables and animations
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Routing**: Wouter for client-side routing (lightweight React router)
- **State Management**: TanStack React Query for server state management
- **Animations**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Typography System**: Responsive typography with clamp() for fluid scaling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Storage**: In-memory storage with interface for future database integration
- **Development**: Hot reload with Vite integration for full-stack development

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared schema definition in `/shared/schema.ts`
- **Users Table**: Basic user structure with id, username, and password fields
- **Migrations**: Managed through Drizzle Kit with migrations stored in `/migrations`

### Project Structure
- `/client` - React frontend application
- `/server` - Express backend application  
- `/shared` - Shared TypeScript types and schemas
- Component organization follows atomic design with `/components/ui` for reusable components

### Build and Deployment
- **Development**: Concurrent frontend and backend development with Vite dev server
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Output**: Frontend builds to `/dist/public`, backend to `/dist`

## Enhanced Features

### Responsive Design
- Mobile-first approach with proper breakpoints
- Fluid typography scaling
- Touch-friendly button sizes
- Better spacing on all devices

### Visual Enhancements
- Sophisticated glass-morphism effects
- Refined gradient backgrounds
- Better shadow depth
- Smooth animated transitions

### Accessibility
- Minimum 48px touch targets for buttons
- Improved contrast ratios
- Better semantic HTML
- Keyboard navigation support

### Performance
- Optimized animations
- Smooth scroll behavior
- Efficient state management
- Fast rendering with memoization

## External Dependencies

### UI and Styling
- **TailwindCSS**: Utility-first CSS framework with custom romantic theme
- **Shadcn/ui**: Pre-built accessible component library
- **Radix UI**: Headless UI primitives for complex components
- **Lucide React**: Icon library for consistent iconography

### Animation and Interactions
- **Framer Motion**: Animation library for smooth transitions and effects
- **Embla Carousel**: Carousel/slider functionality
- **Class Variance Authority**: Utility for conditional CSS classes

### Development Tools
- **Replit Integration**: Custom Replit plugins for development environment
- **TypeScript**: Full type safety across frontend and backend
- **PostCSS**: CSS processing with Autoprefixer

### Audio
- **Mixkit**: Romantic piano background music (3-song playlist)
- **Custom MP3 files**: User-provided instrumental songs
