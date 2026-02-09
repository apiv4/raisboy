# API Documentation Site (Swiss Modernism)

This repository contains a static website ready for deployment on GitHub Pages. It presents API documentation with a Swiss Modernism aesthetic: black hero, Inter and Roboto Mono fonts, dark navy background (#0D1B2A), cyan accent (#00FFFF), and an 8px spacing grid in a three-column responsive layout.

## Contents

- index.html (root entry point)
- css/styles.css
- js/script.js
- assets/ (logo.svg placeholder)

## Features

- Persistent sidebar navigation reflecting the sitemap
- "On this page" dynamic table of contents
- Responsive three-column layout (sidebar • content • TOC) with fallbacks to 2/1 columns on smaller screens
- Syntax-highlighted code blocks (Highlight.js) with copy-to-clipboard buttons
- Collapsible sections via native <details>/<summary>
- API endpoint cards, parameter tables, and error references
- Client-side search with keyboard shortcut (Ctrl/⌘ + K)
- Accessible structure with skip link, focus states

## Local Preview

You can preview locally by opening index.html in your browser. For a simple local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Deploying to GitHub Pages

Follow these steps to deploy the site using GitHub Pages. Two common approaches are supported: main branch root or /docs folder.

### Option A: Deploy from main branch root (recommended for this single-site repo)

1. Create a new repository on GitHub (public or private with Pages enabled for your plan).
2. Add the website files:
   - index.html (at repository root)
   - css/, js/, and assets/ directories
   - README.md
3. Commit and push.
4. Configure GitHub Pages:
   - Navigate to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, Folder: / (root)
   - Save. Wait for the build to finish.
5. Access the site at the URL shown (e.g., https://<your-user>.github.io/<repo>/).

### Option B: Deploy from /docs folder (if your repo hosts code plus docs)

1. Place all website files under a docs/ directory.
2. Settings → Pages → Source: Deploy from a branch.
3. Branch: main, Folder: /docs.
4. Save and wait for deployment.

### Uploading Files via the GitHub Web UI

If you are not using git locally, you can upload files directly:

1. On GitHub, open your repository.
2. Click Add file → Upload files.
3. Drag-and-drop index.html, css/, js/, and assets/.
4. Commit changes to the main branch (or a feature branch + pull request).

### Custom Domain (optional)

If using a custom domain:
- Add a CNAME file at the repository root containing your domain (e.g., `docs.example.com`).
- Configure DNS: Create a CNAME record pointing to `<your-user>.github.io`.
- In Settings → Pages, set Custom domain and enforce HTTPS.

### Cache Busting and Asset Paths

- All assets are referenced with relative paths (./css/styles.css, ./js/script.js). This works on both root and /docs deployments.
- If you reorganize folders, keep index.html at the Pages root so links resolve correctly.

### Security Notes

- Do not commit secrets (API keys, webhook secrets) to the repo.
- All code samples use placeholders; replace with your own values in development environments only.

## Screenshots and Assets

- The site includes a minimal SVG logo placeholder at assets/logo.svg. Replace with your brand mark as needed.

## Troubleshooting

- 404 after enabling Pages: Ensure Source/Branch/Folder settings are correct and index.html is present at the configured root.
- Styles not loading: Confirm css/styles.css exists and paths are correct. Use your browser dev tools (Network tab) to verify.
- Code highlighting not working: Check network access to the Highlight.js CDN or bundle it locally if needed.

## License

This project is provided as-is under the MIT License. Replace or adapt as required.
