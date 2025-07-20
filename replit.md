# Replit.md

## Overview

This is a modern, responsive mental health and addiction treatment landing page for Estância Morro Grande, built with React, TypeScript, and Express.js. The application is designed to capture leads for people seeking mental health treatment and addiction recovery services. It features a professional design with emotional appeal using a natural green color palette, showcasing treatment options, facility structure, testimonials, and a comprehensive lead capture form with insurance/health plan options.

## User Preferences

- Preferred communication style: Simple, everyday language (Portuguese)
- Clinic name: Estância Morro Grande 
- Brand colors: Natural green palette (#4F7942 primary theme)
- Location: Estrada Nakayama 150, Rodovia Bunjiro Nakao km 67,5
- Email: contato@estanciamorrogrande.com.br
- **UI Preferences**: Minimal hero section, no automatic carousels, centralized CTA button
- Hero section: No carousel, centralized "Fale com Especialista" button at bottom center aligned with WhatsApp button

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Storage**: In-memory storage (MemStorage class) with fallback to PostgreSQL

### Development Setup
- **Development Server**: Vite dev server with HMR
- **Production Build**: ESBuild for server bundling, Vite for client bundling
- **Type Checking**: TypeScript with strict mode enabled

## Key Components

### Client-Side Components
1. **Landing Page Sections**:
   - Header with navigation
   - Hero carousel with emotional messaging
   - Treatment information (mental health & addiction)
   - Facility structure showcase
   - Patient testimonials carousel
   - Lead capture form
   - Footer with contact information

2. **UI Components**: Complete shadcn/ui component library including buttons, forms, modals, carousels, and more

3. **Utility Components**:
   - WhatsApp floating button
   - Toast notifications
   - Form validation with Zod schemas

### Server-Side Components
1. **API Routes**:
   - `POST /api/leads` - Submit new lead
   - `GET /api/leads` - Retrieve all leads (admin)

2. **Storage Layer**:
   - `MemStorage` class for in-memory lead storage
   - Interface-based design for easy database switching

3. **Middleware**:
   - Request logging
   - JSON/URL-encoded body parsing
   - Error handling

## Data Flow

1. **Lead Submission**:
   - User fills contact form with name, phone, and treatment type
   - Form validates using Zod schema
   - React Query mutation sends POST request to `/api/leads`
   - Server validates and stores lead data
   - Success/error feedback via toast notifications

2. **Content Display**:
   - Static content rendered from components
   - Image carousels auto-advance every 5-7 seconds
   - Smooth scrolling navigation between sections

3. **Client-Server Communication**:
   - React Query handles API state management
   - Custom `apiRequest` utility for HTTP requests
   - Error boundaries and loading states

## Database Schema

The application uses a simple lead capture schema:

```typescript
leads: {
  id: serial (primary key)
  name: text (required)
  phone: text (required) 
  treatment: text (optional)
  insurance: text (optional) - health insurance/plan
  createdAt: timestamp (auto-generated)
}
```

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI primitives
- **Form Management**: React Hook Form, Zod validation
- **State Management**: TanStack React Query
- **Icons**: Lucide React, React Icons
- **Carousel**: Embla Carousel React
- **Date Handling**: date-fns

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session**: connect-pg-simple
- **Development**: tsx for TypeScript execution

### Development Dependencies
- **Build Tools**: Vite, ESBuild
- **Replit Integration**: Cartographer plugin, runtime error overlay

## Deployment Strategy

### Development
- Vite dev server with HMR on client
- tsx for server-side TypeScript execution
- Replit-specific plugins for development environment

### Production
1. **Client Build**: 
   - Vite builds React app to `dist/public`
   - Optimized bundles with code splitting
   - Static asset optimization

2. **Server Build**:
   - ESBuild bundles server code to `dist/index.js`
   - External packages excluded from bundle
   - ES module format maintained

3. **Database**:
   - Drizzle migrations via `drizzle-kit push`
   - PostgreSQL connection via DATABASE_URL environment variable
   - Fallback to in-memory storage for development

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)

The application is designed to be deployed on platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL support.

## Recent Changes (July 20, 2025)

✓ Successfully migrated from Replit Agent to Replit environment
✓ Removed carousel content from hero section (titles, descriptions, badges)
✓ Simplified hero section to minimal video background only
✓ Moved "Fale com Especialista" button to fixed bottom-center position
✓ Repositioned WhatsApp button to bottom-right as floating action
✓ Added "Atendimento 24 horas" text below CTA button with backdrop
✓ Disabled automatic rotation in testimonials carousel (now static)
✓ Maintained video background and gradient overlay in hero section
✓ Enhanced CTA button with commercial gradient design and shine effects
✓ Redesigned header with premium glassmorphism and gradients
✓ Applied consistent emerald/green branding throughout header
✓ Added interactive hover effects and professional typography
✓ Updated color scheme to use #2c744c as primary brand color
✓ Created harmonious gradient system from #2c744c to #1e5233
✓ Unified visual identity across header, CTA button, and site elements
✓ Updated CSS variables to maintain color consistency throughout

## Recent Changes

- **July 20, 2025**: Successfully migrated from Replit Agent to Replit environment
  - Installed required packages (tsx, Node.js runtime)
  - Fixed server architecture and security configuration
  - Updated hero section layout per user request:
    - Removed carousel from hero section
    - Moved "Fale com Especialista" button to fixed bottom-center position
    - Maintained WhatsApp button in bottom-right position
    - Both buttons now on same horizontal line for better UX