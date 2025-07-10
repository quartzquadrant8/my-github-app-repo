// src/main.js
import { RepoCard } from './components/RepoCard.js';
import { getRepos, createRepo } from './services/githubApi.js'; // Ensure these are exported from githubApi.js

// --- DOM Elements ---
// FIX 1: Select the main app container based on index.html's id="root"
const appDiv = document.querySelector('#root');

// FIX 2: Declare these with 'let' because they will be re-selected after innerHTML
let repoListContainer;
let messageArea;

// --- Render Initial UI (Input form and buttons) ---
function renderInitialUI() {
    // FIX 3: Set innerHTML FIRST. This creates all the basic structure in the DOM.
    // Moved <p id="message-area"></p> to be part of the innerHTML content
    appDiv.innerHTML = `
        <div class="main-header">
            <h1>GitHub Repo Creator!</h1>
            <p>Manage your GitHub repositories.</p>
        </div>

        <div class="repo-actions">
            <input type="text" id="usernameInput" placeholder="Enter GitHub Username (e.g., octocat)" value="octocat">
            <button id="fetchReposBtn">Fetch Repositories</button>
        </div>

        <div class="repo-actions create-repo-section">
            <h2>Create New Repository</h2>
            <input type="text" id="newRepoNameInput" placeholder="New Repo Name">
            <input type="text" id="newRepoDescriptionInput" placeholder="Description (optional)">
            <button id="createRepoBtn">Create Repository</button>
        </div>

        <div id="repo-list-container" class="repo-grid">
            <p id="loading-message" style="display: none;">Loading repositories...</p>
            <p id="error-message" style="display: none; color: red;"></p>
        </div>

        <p id="message-area"></p> `;

    // FIX 4: Re-select elements AFTER appDiv.innerHTML has created them in the DOM.
    // The previous 'const' declarations are now replaced by re-assigning these 'let' variables.
    repoListContainer = document.querySelector('#repo-list-container');
    messageArea = document.querySelector('#message-area');

    // --- Event Listeners ---
    const fetchReposBtn = document.querySelector('#fetchReposBtn');
    if (fetchReposBtn) {
        fetchReposBtn.addEventListener('click', handleFetchRepos);
    }

    const createRepoBtn = document.querySelector('#createRepoBtn');
    if (createRepoBtn) {
        createRepoBtn.addEventListener('click', handleCreateRepo);
    }

    // Event Delegation for "View Details" buttons (ensure repoListContainer was successfully re-selected)
    if (repoListContainer) { // Good practice to check if selection was successful
        repoListContainer.addEventListener('click', handleRepoCardAction);
    }
}

// --- Utility Functions ---
// These functions use the 'messageArea' and 'repoListContainer' variables that are now correctly re-selected.
function displayMessage(msg, isError = false) {
    if (messageArea) { // Add check for null
        messageArea.textContent = msg;
        messageArea.style.color = isError ? 'red' : 'green';
        messageArea.style.display = 'block';
        setTimeout(() => {
            messageArea.style.display = 'none';
            messageArea.textContent = '';
        }, 5000); // Hide message after 5 seconds
    }
}

function showLoading(show) {
    const loadingMessage = document.querySelector('#loading-message'); // This element is inside innerHTML, so it's fine
    if (loadingMessage) {
        loadingMessage.style.display = show ? 'block' : 'none';
    }
}

function showError(msg) {
    const errorMessage = document.querySelector('#error-message'); // This element is inside innerHTML, so it's fine
    if (errorMessage) {
        errorMessage.textContent = `Error: ${msg}`;
        errorMessage.style.display = 'block';
    }
}

function clearErrors() {
    const errorMessage = document.querySelector('#error-message'); // This element is inside innerHTML, so it's fine
    if (errorMessage) {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }
}

// --- Event Handlers ---
async function handleFetchRepos() {
    clearErrors();
    const usernameInput = document.querySelector('#usernameInput');
    const username = usernameInput ? usernameInput.value.trim() : '';

    if (!username) {
        displayMessage('Please enter a GitHub username.', true);
        return;
    }

    if (repoListContainer) { // Add check for null
        repoListContainer.innerHTML = ''; // Clear previous repos
    }
    showLoading(true);

    try {
        const repos = await getRepos(username);
        if (repos && repos.length > 0) {
            repos.forEach(repo => {
                if (repoListContainer) { // Add check for null
                    // Directly append the HTML string
                    repoListContainer.innerHTML += RepoCard(repo);
                }
            });
            displayMessage(`Successfully fetched ${repos.length} repositories for ${username}.`);
        } else {
            if (repoListContainer) { // Add check for null
                repoListContainer.innerHTML = '<p>No repositories found for this user.</p>';
            }
            displayMessage(`No repositories found for ${username}.`);
        }
    } catch (error) {
        console.error('Error in handleFetchRepos:', error);
        showError(error.message || 'Failed to fetch repositories.');
        displayMessage('Failed to fetch repositories. Check console for details.', true);
    } finally {
        showLoading(false);
    }
}

async function handleCreateRepo() {
    clearErrors();
    const newRepoNameInput = document.querySelector('#newRepoNameInput');
    const newRepoDescriptionInput = document.querySelector('#newRepoDescriptionInput');

    const name = newRepoNameInput ? newRepoNameInput.value.trim() : '';
    const description = newRepoDescriptionInput ? newRepoDescriptionInput.value.trim() : '';

    if (!name) {
        displayMessage('Please enter a name for the new repository.', true);
        return;
    }

    displayMessage('Creating repository...', false);

    try {
        const repoDetails = { name, description };
        const newRepo = await createRepo(repoDetails);
        displayMessage(`Repository "${newRepo.name}" created successfully!`, false);
        // Optionally, re-fetch the list to show the new repo
        const username = document.querySelector('#usernameInput').value.trim();
        if (username) {
            await handleFetchRepos();
        }
        // Clear input fields
        if (newRepoNameInput) newRepoNameInput.value = '';
        if (newRepoDescriptionInput) newRepoDescriptionInput.value = '';

    } catch (error) {
        console.error('Error in handleCreateRepo:', error);
        showError(error.message || 'Failed to create repository.');
        displayMessage('Failed to create repository. Check console for details.', true);
    }
}

// Handle clicks on RepoCard buttons using event delegation
function handleRepoCardAction(event) {
    const target = event.target;
    if (target.classList.contains('view-details-button')) {
        const repoName = target.dataset.repoName;
        const repoUrl = target.dataset.repoUrl;
        alert(`Viewing details for: ${repoName}\nURL: ${repoUrl}\n(In a real app, this would navigate to a detailed view or open a modal)`);
        // Here, you would typically:
        // 1. Navigate to a /repo/:name route
        // 2. Open a modal with more repo details
        // 3. Make another API call to get more specific repo data
    }
}

// Initial render when the script loads
renderInitialUI();

// Automatically fetch repos for the default user on load
handleFetchRepos();
