# GitHub Project Builder (Termux Deployment)

This project provides a simple web interface (frontend) and a Node.js backend to interact with the GitHub API, allowing users to scaffold new Vite projects and manage repositories directly from their Termux environment.

## Features

* Create new GitHub repositories via a web interface.
* Display a list of existing GitHub repositories.
* Backend functionality to scaffold Vite projects into Termux.
* Integrated frontend (Vite/JavaScript) and backend (Node.js/Express) services.

## Prerequisites

To run this application in Termux on your Android device, you will need:

* **Termux App:** Installed from F-Droid (highly recommended for stability).
* **A GitHub Account:** Essential for API interactions.
* **GitHub Personal Access Token (PAT):**
    * Required by the backend to authenticate with GitHub.
    * **Must have `repo` scope enabled.**
    * Generate one here: [https://github.com/settings/tokens](https://github.com/settings/tokens) (or navigate to GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic) -> Generate new token).
* **SSH Key Setup on GitHub:** Your GitHub account must have an SSH key added that matches the one generated in Termux. This is required for cloning private repositories and for Git operations.

## Setup & Deployment

Follow these steps to get the GitHub Project Builder running in your Termux environment:

1.  **Install Termux:**
    Download and install the Termux app from F-Droid: [https://f-droid.org/packages/com.termux/](https://f-droid.org/packages/com.termux/)

2.  **Download the Deployment Script:**
    Open Termux and navigate to your home directory:
    ```bash
    cd ~
    ```
    Download the `deploy-app.sh` script:
    ```bash
    curl -O [https://raw.githubusercontent.com/your_username/your_deploy_script_repo/main/deploy-app.sh](https://raw.githubusercontent.com/your_username/your_deploy_script_repo/main/deploy-app.sh)
    # IMPORTANT: Replace 'your_username/your_deploy_script_repo' with the actual path
    # where you host your deploy-app.sh script on GitHub.
    ```

3.  **Make the Script Executable:**
    ```bash
    chmod +x deploy-app.sh
    ```

4.  **Run the Deployment Script:**
    Execute the script. It will guide you through installing necessary packages, cloning repositories, installing dependencies, and configuring your GitHub PAT and Username.
    ```bash
    ./deploy-app.sh
    ```
    * **Follow the prompts:** You will be asked to enter your GitHub Personal Access Token (PAT) and your GitHub Username.
    * **SSH Key Prompt:** The script will remind you about SSH key setup. If you haven't done this, follow the instructions in the script (or consult `dependency.txt`).

5.  **Access the Application:**
    Once the `deploy-app.sh` script finishes, both your frontend and backend servers will be running.

    * **Frontend (Web UI):** Open your device's web browser and go to `http://localhost:5173`.
    * **Backend API:** (For testing/debugging) The backend runs on `http://localhost:3000`.

## Important Notes

* The application runs in your Termux session. If Termux closes or the device sleeps too deeply, the servers might stop. You may need to restart `deploy-app.sh` or manually restart the `npm run dev:all` command.
* The `deploy-app.sh` script will install `nodejs`, `git`, `openssh`, `termux-api`, and `curl` if they are not already present.
* Ensure your `my-github-app-repo` and `API` GitHub repositories are up-to-date with the latest code. The script will pull the `main` branch.

## Troubleshooting

* **"Could not resolve entry module 'index.html'" or similar build errors:**
    * Ensure `index.html` is in the root of your `my-github-app-repo` on GitHub.
    * Ensure your `vite.config.js` and `package.json` for `my-github-app-repo` are correctly configured for your project type (e.g., React plugin if using React).
* **"npm error EJSONPARSE"**:
    * Your `package.json` file contains invalid JSON (often due to comments). Edit it in your local dev environment, remove all comments, commit, and push. Then re-run `deploy-app.sh`.
* **"GitHub Personal Access Token is not configured"**:
    * Check that you entered the correct PAT when prompted.
    * Ensure the PAT has the `repo` scope enabled on GitHub.
    * Verify the `API/.env` file in Termux (e.g., `cat API/.env`) to ensure the PAT is correctly written.
* **"non-fast-forward" during `git push`**:
    * You need to pull changes from the remote first: `git pull origin main --rebase` (then resolve any conflicts), and then `git push origin main`.
* **`Port 5173` or `Port 3000` already in use**:
    * Another process might be using the port. Close other apps or try restarting Termux.

## Credits

* Built with Vite, Node.js, Express, and concurrently.

## License

[e.g., MIT License - or specify your chosen license]
