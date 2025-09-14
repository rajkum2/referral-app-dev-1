# ReferLoop - Student Referrals CRM

A mobile-first CRM application for managing student referrals, built with Next.js and modern web technologies.

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **PWA**: Next PWA with Workbox
- **Theme**: Dark mode support with next-themes

## Project Structure

```
app/
├── (dashboard)/          # Main dashboard routes
│   ├── layout.tsx       # Dashboard layout with navigation
│   ├── page.tsx         # Home dashboard
│   ├── students/        # Student management
│   ├── partners/        # Partner management
│   ├── matches/         # Program/job matching
│   ├── referrals/       # Referral pipelines
│   ├── commissions/     # Financial tracking
│   ├── reports/         # Analytics
│   └── settings/        # App configuration
├── globals.css
├── layout.tsx           # Root layout
└── page.tsx            # Landing page

components/
├── navigation/          # Navigation components
├── shared/             # Reusable UI components
└── ui/                 # shadcn/ui components

lib/
├── store.ts            # Zustand store
├── queries.ts          # React Query setup
└── utils.ts            # Utility functions
```

## Navigation System

### Mobile (≤768px)
- Sticky bottom tab bar with icons and labels
- Six main sections: Home, Students, Matches, Partners, Referrals, More

### Desktop (≥1024px)
- Top app bar with branding and user controls
- Left sidebar with expandable navigation
- Bottom tabs hidden on desktop

### Master-Detail Layouts
- **Partners**: 30-40% list, 60-70% detail
- **Students**: 40% list, 60% detail
- Responsive breakdowns on smaller screens

## Development Phases

### Phase A (Current) ✅
- [x] Project scaffold with responsive navigation
- [x] Route structure with placeholder UIs
- [x] Master-detail layouts (desktop)
- [x] Shared component library
- [x] PWA basics
- [x] Dark mode support

### Phase B (Next)
- [ ] Authentication & user management
- [ ] Student CRUD operations
- [ ] Partner management system
- [ ] Real-time notifications

### Phase C (Future)
- [ ] Advanced matching algorithms
- [ ] Commission calculations
- [ ] Reporting & analytics
- [ ] Mobile app deployment

## Getting Started

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## PWA Features

- Offline support with service worker
- App manifest for installation
- Cached shell for fast loading
- Mobile-optimized experience