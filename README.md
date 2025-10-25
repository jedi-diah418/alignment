# Alignment Discipleship Program

A fast, mobile-optimized static site for distributing church education resources with secure member access.

## Features

- **Fast Loading**: Built with Vite for optimal performance
- **Mobile-First Design**: Responsive layout optimized for mobile devices
- **Secure Authentication**: Clerk-powered user management and gating
- **Protected Downloads**: Member-only access to PowerPoint files, PDFs, and audio resources
- **Church-Focused**: Designed for churches to purchase and implement the program
- **GitHub Pages Deployment**: Automatic deployment via GitHub Actions

## Quick Start

### Prerequisites

- Node.js 20+ installed
- A Clerk account (free at [clerk.com](https://clerk.com))

### Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up authentication:**
   - Sign up at [dashboard.clerk.com](https://dashboard.clerk.com)
   - Create a new application
   - Copy your publishable key
   - Create a `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Add your Clerk key to `.env`:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
     ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

## GitHub Pages Deployment

This site is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Setup Instructions

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to Pages (under "Code and automation")
   - Source: Select "GitHub Actions"

2. **Add Clerk Secret:**
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: Your Clerk publishable key (starts with `pk_`)

3. **Configure Clerk Redirects:**
   - In your Clerk dashboard, go to "Paths"
   - Add your GitHub Pages URL (e.g., `https://yourusername.github.io/alignment/`)
   - Configure the following redirects:
     - Sign in: `/dashboard.html`
     - Sign up: `/dashboard.html`
     - Home URL: `/`

4. **Deploy:**
   - Push to main branch
   - GitHub Actions will automatically build and deploy
   - Your site will be live at: `https://yourusername.github.io/alignment/`

## Site Structure

```
/                   - Public landing page
/login.html        - Authentication page
/dashboard.html    - Protected member dashboard with downloadable resources
```

## Customization

### Updating Content

- **Landing Page**: Edit `index.html`
- **Styles**: Modify `src/styles/main.css`
- **Resources**: Update the resource lists in `dashboard.html`

### Adding Real Downloads

The current implementation shows download notifications. To add real file downloads:

1. Store your files in a secure location (e.g., AWS S3 with signed URLs)
2. Create an API endpoint that verifies user authentication
3. Update `src/dashboard.js` to call your API and download actual files

Example:
```javascript
function showDownloadNotification(title, type) {
  // Replace with actual download
  window.location.href = `/api/download?resource=${encodeURIComponent(title)}`;
}
```

### Customizing Base URL

If deploying to a different path, update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/your-path/',  // Change this
  // ...
});
```

## Technology Stack

- **Build Tool**: Vite 5
- **Authentication**: Clerk
- **Styling**: Custom CSS with mobile-first approach
- **Fonts**: Inter (Google Fonts)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized for Core Web Vitals
- Minimal JavaScript bundle
- Fast initial load time
- Mobile-optimized assets

## Security

- Authentication via Clerk (industry-standard security)
- Protected routes with redirect for non-authenticated users
- Client-side session management
- Secure download tracking

## Support

For questions or issues:
- Check [Clerk Documentation](https://clerk.com/docs)
- Review [Vite Documentation](https://vitejs.dev)
- Open an issue in this repository

## License

All rights reserved - Alignment Discipleship Program
