# Bolt Import Instructions

## 🎯 How to Import This Project into Bolt

### Step 1: Copy Repository URL
```
https://github.com/kian-alves/CXR-UX-cards-research
```

### Step 2: Select Branch
```
card-test
```

### Step 3: Import in Bolt
1. Go to [Bolt](https://bolt.new)
2. Click "Import from GitHub" or similar option
3. Paste the repository URL
4. Select branch: `card-test`
5. Click "Import"

### Step 4: Wait for Setup (2-3 minutes)
Bolt will automatically:
- ✅ Clone the repository
- ✅ Read `bolt.json` configuration
- ✅ Install all dependencies (~500 packages)
- ✅ Start the development server on port 5174
- ✅ Open preview window

### Step 5: Start Using!
The app will be running at: `http://localhost:5174`

## 📚 Getting Started Resources

Once imported, check these files:
- **`.bolt/QUICKSTART.md`** - Interactive tutorial (START HERE!)
- **`.bolt/README.md`** - Full project documentation
- **`.bolt/SETUP.md`** - Troubleshooting guide
- **`bolt.json`** - Bolt configuration details

## 🚀 Quick Test

After import, try this:
1. Navigate to `/login`
2. Click "Continue" (no password needed)
3. Go to My Profile → Dependents
4. Add a dependent with validation:
   - SSN: Only accepts numbers
   - Birth Date: Auto-formats to MM/DD/YYYY
5. Refresh the page → Dependent still there! (localStorage)

## 📦 What's Included

### Configuration Files
- ✅ `bolt.json` - Main Bolt configuration
- ✅ `.bolt/config.json` - Bolt-specific settings
- ✅ `.boltignore` - Files to exclude
- ✅ `.bolt/README.md` - Full documentation
- ✅ `.bolt/SETUP.md` - Setup & troubleshooting
- ✅ `.bolt/QUICKSTART.md` - Interactive guide

### Project Features
- ✅ 60+ accessible UI components
- ✅ Complete consumer experience pages
- ✅ Form validation with real-time feedback
- ✅ localStorage persistence
- ✅ Responsive design
- ✅ Dark mode ready
- ✅ WCAG 2.1 AA compliant

### Tech Stack
- ⚛️ React 19
- 📘 TypeScript 5.9
- ⚡ Vite 7
- 🎨 Tailwind CSS 3.4
- 🔧 Radix UI
- 🧭 React Router 7

## 🎨 Key Pages to Explore

| URL | Description |
|-----|-------------|
| `/` | Home page |
| `/login` | Login (no auth) |
| `/my-profile?subPage=dependents` | Dependents management |
| `/my-profile?subPage=beneficiaries` | Beneficiaries management |
| `/my-profile?subPage=banking` | Bank Accounts |
| `/message-center` | Messages/notifications |
| `/design-system` | Component showcase |

## 💡 Tips for Bolt

1. **Terminal Access**: Use Bolt's terminal to run commands
2. **File Editor**: Edit files directly in Bolt's code editor
3. **Preview**: Use the preview panel for instant updates
4. **Hot Reload**: Changes appear within 100ms
5. **Console**: F12 to access browser DevTools

## 🔧 Common Commands

```bash
# Already running automatically
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Run tests
npm run test:unit

# Lint code
npm run lint
```

## 🆘 Troubleshooting

### Dependencies Not Installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use?
Bolt will automatically find an available port. Check terminal for the actual port number.

### Blank Screen?
1. Check terminal for errors
2. Check browser console (F12)
3. Verify dev server is running
4. Try hard refresh: Ctrl+Shift+R

### Changes Not Showing?
1. Wait 100ms (file polling)
2. Hard refresh browser
3. Verify file is saved

## 📊 Project Stats

- **Total Components**: 60+
- **Total Pages**: 15+
- **Lines of Code**: ~10,000+
- **Dependencies**: ~100
- **Development Time Saved**: Hours! (Zero config needed)

## 🎯 What Makes This Bolt-Ready?

✅ **Zero Configuration** - Just import and go  
✅ **Auto-Setup** - Dependencies install automatically  
✅ **Fast HMR** - See changes in <100ms  
✅ **Comprehensive Docs** - Multiple guides included  
✅ **Pre-configured** - Ports, scripts, everything set up  
✅ **Error Handling** - Clear troubleshooting guides  
✅ **Best Practices** - Modern React patterns  
✅ **Production Ready** - Can build and deploy immediately  

## 🌟 Next Steps After Import

1. Read `.bolt/QUICKSTART.md` for guided tour
2. Try adding a dependent to test forms
3. Explore the component library at `/design-system`
4. Modify a component's styling
5. Build something awesome!

## 📞 Support

If you encounter issues:
1. Check `.bolt/SETUP.md` for troubleshooting
2. Review terminal output for errors
3. Check browser console for JavaScript errors
4. Verify Node.js version is 18+

## 🎉 Ready to Go!

Your project is now fully configured for Bolt. Just import and start building!

**Repository**: https://github.com/kian-alves/CXR-UX-cards-research  
**Branch**: card-test  
**Import Time**: ~2-3 minutes  
**First Page Load**: ~1 second  

Happy coding in Bolt! 🚀

