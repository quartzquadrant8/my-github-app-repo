// src/services/githubApi.js
// Base URL for your backend API that proxies GitHub API calls
// Ensure your Vite proxy (vite.config.js) is set up correctly for '/api'
const API_BASE_URL = '/api';

/**
 * Fetches a list of repositories for a given user.
 * @param {string} username - The GitHub username.
 * @returns {Promise<Array>} A promise that resolves to an array of repositories.
 */
export async function getRepos(username) {
    try {
        const response = await fetch(`${API_BASE_URL}/repos?username=${username}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch repositories.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error; // Re-throw to allow calling code to handle
    }
}

/**
 * Creates a new GitHub repository via your backend.
 * @param {object} repoDetails - Object containing repo details (name, description, etc.).
 * @returns {Promise<object>} A promise that resolves to the created repository object.
 */
export async function createRepo(repoDetails) {
    try {
        const response = await fetch(`${API_BASE_URL}/create-repo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(repoDetails),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create repository.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating repository:', error);
        throw error;
    }
}

// Add more functions as needed (e.g., updateRepo, deleteRepo, getRepoDetails, etc.)
/*
export async function deleteRepo(owner, repoName) {
    try {
        const response = await fetch(`${API_BASE_URL}/delete-repo`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ owner, repoName }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete repository.');
        }
        return { success: true, message: 'Repository deleted.' };
    } catch (error) {
        console.error('Error deleting repository:', error);
        throw error;
    }
}
*/
