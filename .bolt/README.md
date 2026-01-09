# WEX Design System - Bolt Configuration

This project is configured to run in Bolt with minimal setup.

## Quick Start in Bolt

1. **Import this repository** into Bolt
2. Bolt will automatically detect the configuration and install dependencies
3. The development server will start on port 5174

## Project Overview

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS + Design Tokens
- **UI Library**: Radix UI + shadcn/ui
- **Router**: React Router v7

## Key Features

### Design System Components
- 60+ WEX-branded components in `src/components/wex/`
- Built on top of shadcn/ui primitives
- Full accessibility support (WCAG 2.1 AA compliant)
- Dark mode support with theme tokens

### Consumer Experience Pages
- Login flow (simplified for demo)
- My Profile with sub-pages:
  - Dependents management
  - Beneficiaries management
  - Bank Accounts management
  - Debit Card
  - Login & Security
  - Communication Preferences
- Message Center
- HSA Enrollment flow

### Data Persistence
- localStorage-based persistence for user data
- Dependents, beneficiaries, and bank accounts are saved automatically
- Data survives page navigation and browser restarts

## Available Pages

| Route | Description |
|-------|-------------|
| `/` | Home/Landing page |
| `/login` | Login page (no authentication required) |
| `/my-profile` | User profile with multiple sub-pages |
| `/message-center` | Message/notification center |
| `/hsa-enrollment/*` | HSA enrollment flow |
| `/design-system` | Component showcase and documentation |

## Development

```bash
# Install dependencies
npm install

# Start dev server (port 5174)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test:unit

# Run accessibility tests
npm run test:a11y
```

## Environment

The project runs in development mode by default. No environment variables are required for basic functionality.

## Build Output

- Build output goes to `dist/`
- Assets are optimized and code-split automatically
- Base path can be configured in `vite.config.ts` for deployment

## Troubleshooting in Bolt

### Port Already in Use
The project uses port 5174. If it's busy, Bolt will automatically find an available port.

### Dependencies Installation
If dependencies fail to install, Bolt will show the error. Common fixes:
- Check Node.js version (requires Node 18+)
- Clear node_modules and try again
- Check package.json for any syntax errors

### Hot Module Replacement (HMR)
HMR is enabled and uses polling for file changes. Updates should appear instantly in the browser.

## Project Structure

```
CXR-UX-cards-research/
├── src/
│   ├── components/
│   │   ├── ui/          # Base shadcn/ui components
│   │   └── wex/         # WEX-branded components
│   ├── docs/
│   │   ├── pages/       # All application pages
│   │   │   ├── consumer/    # Consumer experience pages
│   │   │   ├── components/  # Component documentation
│   │   │   └── ...
│   │   ├── context/     # React contexts (Auth, etc.)
│   │   └── layout/      # Layout components
│   ├── styles/          # Design tokens and CSS
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── .bolt/              # Bolt configuration
└── package.json        # Dependencies and scripts
```

## Key Technologies

- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.9** - Type safety and better DX
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **React Router 7** - Client-side routing
- **Lucide React** - Icon library
- **date-fns** - Date utility library
- **React Hook Form** - Form validation
- **Zod** - Schema validation

## Design Tokens

The project uses a three-layer token architecture:

1. **Palette Ramps** (`wex.tokens.css`) - Base color scales
2. **Semantic Tokens** (`wex.shadcn-bridge.css`) - Intent-based mappings
3. **Tailwind Utilities** - CSS classes

All tokens support light and dark modes automatically.

## Notes for Bolt

- This is a frontend-only project (no backend required)
- All data is stored in browser localStorage
- No authentication system (login is bypassed for demo purposes)
- Perfect for prototyping and design system development
- Can be deployed as a static site

