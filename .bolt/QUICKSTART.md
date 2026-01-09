# 🚀 Quick Start Guide for Bolt

## What is This Project?

The **WEX Design System** is a comprehensive React-based design system with:
- 60+ accessible UI components
- Consumer experience pages (Profile, Banking, Messages)
- Complete HSA enrollment flow
- Built-in data persistence
- Dark mode support

## Getting Started in Bolt

### Step 1: Import the Project
```
Import from GitHub: https://github.com/kian-alves/CXR-UX-cards-research
Branch: card-test
```

### Step 2: Wait for Setup
Bolt will automatically:
- Install all dependencies (~2-3 minutes)
- Start the development server
- Open the preview window

### Step 3: Start Exploring!
The app will open at: `http://localhost:5174`

## What to Try First

### 1. Login (No Auth Required!)
- Go to `/login`
- Just click "Continue" - no password needed!
- Redirects to home page

### 2. My Profile Pages
Click your profile icon (top right) → Select a page:
- **My Profile** - View/edit contact info
- **Dependents** - Add family members (with validation!)
- **Beneficiaries** - Manage beneficiaries
- **Bank Accounts** - Add bank accounts
- **Debit Card** - View card info
- **Communication Preferences** - Email/SMS settings

### 3. Add a Dependent (Test Persistence!)
1. Go to My Profile → Dependents
2. Click "Add New Dependent"
3. Fill out the form:
   - SSN: numbers only (validation!)
   - Birth Date: auto-formats to MM/DD/YYYY
   - Gender: Male or Female only
4. Click Save
5. **Refresh the page** - your dependent is still there! (localStorage magic ✨)

### 4. Message Center
- Click the bell icon 🔔 (top right)
- View, mark read/unread, delete messages
- Watch the badge count update

### 5. Design System
- Navigate to `/design-system`
- Browse all 60+ components
- See live examples and code snippets

## Key Features

### ✅ Form Validation
- **SSN**: Numbers only, shows error if you type letters
- **Birth Date**: Auto-formats as you type (MM/DD/YYYY)
- **Email**: Standard email validation
- **Required fields**: Can't submit without filling them

### ✅ Data Persistence
Everything you add is automatically saved:
- Dependents
- Beneficiaries  
- Bank Accounts
- Message read/unread status

Data persists even if you:
- Refresh the page
- Navigate away and come back
- Close and reopen Bolt

### ✅ Responsive Design
- Works on mobile, tablet, and desktop
- Sidebar collapses on mobile
- Touch-friendly buttons (44x44px minimum)

### ✅ Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels

### ✅ Dark Mode Ready
- Design tokens support both themes
- Can be toggled (if theme switcher is implemented)

## Project Structure Explained

```
src/
├── components/
│   ├── ui/              # Base components (from shadcn/ui)
│   └── wex/             # WEX-branded components (your design system)
│
├── docs/pages/
│   ├── consumer/        # 👤 User-facing pages
│   │   ├── MyProfile.tsx           # Main profile with sub-pages
│   │   ├── ConsumerNavigation.tsx  # Top navigation bar
│   │   ├── MessageCenter.tsx       # Messages/notifications
│   │   └── HSA*.tsx               # HSA enrollment flow
│   │
│   └── components/      # 📚 Component documentation pages
│
├── docs/context/
│   └── AuthContext.tsx  # Simple auth state management
│
└── styles/
    ├── wex.tokens.css           # Design tokens (colors, spacing)
    └── wex.shadcn-bridge.css    # Token → component mapping
```

## Common Tasks

### Add a New Page
1. Create file in `src/docs/pages/`
2. Add route in `src/docs/routes.tsx`
3. Link to it from navigation

### Modify a Component
1. Find component in `src/components/wex/`
2. Edit the file
3. Save - HMR will update instantly!

### Change Colors/Styling
1. Edit `src/styles/wex.tokens.css` for design tokens
2. Or use Tailwind classes directly in components

### Clear Saved Data
Open browser console and run:
```javascript
localStorage.clear()
location.reload()
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7.2 | Build tool & dev server |
| Tailwind CSS | 3.4 | Styling |
| Radix UI | Latest | Accessible primitives |
| React Router | 7.11 | Routing |
| Lucide React | Latest | Icons |
| Zod | 4.2 | Validation schemas |

## Terminal Commands

```bash
# Install dependencies (automatic in Bolt)
npm install

# Start dev server (automatic in Bolt)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run unit tests
npm run test:unit

# Run accessibility tests
npm run test:a11y
```

## Troubleshooting

### Blank Screen?
1. Check terminal for errors
2. Check browser console (F12)
3. Try: `npm run dev` to restart server

### Changes Not Showing?
1. Wait 100ms (polling interval)
2. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check if file is saved

### Port Conflict?
Bolt will automatically find an available port. Check terminal for actual port number.

### TypeScript Errors?
These are mostly warnings and won't prevent the app from running. The build is configured to be lenient.

## Tips for Bolt

1. **Use the preview panel** - It auto-refreshes on changes
2. **Terminal is your friend** - Watch for errors and warnings
3. **Browser DevTools** - F12 to debug and inspect
4. **localStorage** - Check Application tab in DevTools to see saved data
5. **Network tab** - See all file loads and API calls (none in this project)

## Next Steps

Now that you're set up, try:
1. ✏️ Modify a component's styling
2. ➕ Add a new form field to the dependent modal
3. 🎨 Change the primary color in the design tokens
4. 📄 Create a new page
5. 🧪 Write a test for a component

## Questions?

Check these files for more info:
- `.bolt/README.md` - Full project documentation
- `.bolt/SETUP.md` - Detailed setup instructions
- `README.md` - Original project README
- Component files - Most have JSDoc comments

## Have Fun! 🎉

This is a fully functional design system. Explore, modify, break things, and learn!

The code is yours to experiment with. Everything is saved automatically, so feel free to try anything!

