# Bolt Setup Instructions

## Automatic Setup (Recommended)

Bolt will automatically detect the project configuration and perform these steps:

1. ✅ Read `.bolt/config.json` for project settings
2. ✅ Install dependencies via `npm install`
3. ✅ Start the dev server on port 5174
4. ✅ Open the application in the Bolt preview

## Manual Setup (If Needed)

If automatic setup doesn't work, run these commands in Bolt's terminal:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The application will be available at `http://localhost:5174`

## First-Time Setup Checklist

- [ ] Dependencies installed (check for `node_modules/` folder)
- [ ] Dev server running (should see Vite output in terminal)
- [ ] Application loads in preview (WEX logo should be visible)
- [ ] Can navigate between pages
- [ ] localStorage is working (add a dependent and refresh - it should persist)

## Verifying the Setup

### 1. Check Dependencies
```bash
npm list --depth=0
```
Should show all packages from package.json

### 2. Check Dev Server
```bash
npm run dev
```
Should output:
```
VITE v7.3.0  ready in XXXXms
➜  Local:   http://localhost:5174/
```

### 3. Test the Application
- Navigate to `/login` - should see login page
- Click "Continue" - should redirect to home
- Navigate to `/my-profile?subPage=dependents` - should see dependents page
- Add a dependent - should save and persist

## Common Issues and Fixes

### Issue: Port 5174 is already in use
**Solution**: Bolt will automatically use a different port. Check the terminal for the actual port.

### Issue: Dependencies fail to install
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution**: This is expected - the project has some intentional TypeScript allowances. The app will still run.

### Issue: HMR not working
**Solution**: The project uses polling. Changes should appear within 100ms. Try hard refresh (Ctrl+Shift+R)

### Issue: Blank screen
**Solution**: 
1. Check browser console for errors
2. Verify dev server is running
3. Try clearing browser cache
4. Check if base path is correct in vite.config.ts

## Environment Setup

No environment variables are required for basic functionality. The project works out of the box.

Optional environment variables (create `.env` file):
```env
# Not required - project works without these
VITE_APP_NAME=WEX Design System
VITE_API_URL=http://localhost:3000
```

## Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Build output will be in the `dist/` folder.

## Features to Test

### 1. Authentication
- Go to `/login`
- Click "Continue" (no credentials needed)
- Should redirect to home page

### 2. My Profile
- Navigate to "My Profile" from header dropdown
- Test all sub-pages:
  - My Profile (contact info)
  - Dependents (add/edit/delete)
  - Beneficiaries (add/edit/delete)
  - Bank Accounts (add/edit/delete)
  - Debit Card
  - Login & Security
  - Communication Preferences

### 3. Data Persistence
- Add a dependent
- Refresh the page
- Dependent should still be there (localStorage)

### 4. Message Center
- Click bell icon in header
- Should show message list
- Mark messages as read/unread
- Delete messages

### 5. Design System
- Navigate to `/design-system`
- Browse component documentation
- Test interactive examples

## Performance Tips

- The project uses code splitting - initial load only loads required chunks
- Images are optimized
- CSS is purged in production (Tailwind removes unused styles)
- HMR updates are fast (typically <100ms)

## Next Steps After Setup

1. Explore the `/my-profile` pages
2. Test the form validation (add dependent with validation)
3. Check the design system documentation at `/design-system`
4. Try the theme builder (if implemented)
5. Test accessibility features

## Support

If you encounter issues in Bolt:
1. Check the terminal output for errors
2. Check browser console for JavaScript errors
3. Verify Node.js version is 18+
4. Try clearing Bolt's cache and restarting

