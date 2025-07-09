# my-github-app-repo

This is a client-side web application for creating and managing GitHub repositories, built with Vite.

## Project Structure

- `public/`: Static assets served directly (e.g., `index.html`, `favicon.ico`).
- `src/`: All application source code.
  - `assets/`: Processed static assets (images, styles).
  - `components/`: Reusable UI components.
  - `services/`: Logic for interacting with the backend API (`githubApi.js`).
  - `utils/`: Utility functions.
  - `main.js`: Main JavaScript entry point.
  - `index.css`: Global styles.

## Setup

1.  **Generate Backend:** Ensure your Node.js backend server (which handles GitHub API calls) is set up and running, preferably on `http://localhost:3000` as configured in `vite.config.js`.
2.  **Install Dependencies:**
    ```bash
    cd my-github-app-repo
    npm install
    ```
3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server (usually on `http://localhost:5173`).

## Build for Production

```bash
npm run build
```
This will create a `dist/` folder with the optimized production build.

## API Integration

Edit `src/services/githubApi.js` to add functions for creating, listing, and managing repositories by calling your backend API (`/api/create-repo`, etc.).

---
**Note:** Remember that this client-side application communicates with a separate backend server to securely interact with the GitHub API. This setup ensures your GitHub Personal Access Token (PAT) is never exposed on the client.
