// src/components/RepoCard.js
import './styles.css'; // Assume component-specific styles

/**
 * A simple component to display GitHub repository information.
 * Returns an HTML string.
 * @param {object} repo - The repository object from the GitHub API.
 * @returns {string} HTML string representing the repo card.
 */
export function RepoCard(repo) { // Changed props to directly accept repo for simplicity
    if (!repo || !repo.name) { // Added a check for repo.name
        return `<div class="repo-card">No repository data.</div>`;
    }

    const description = repo.description || 'No description provided.';
    const stars = repo.stargazers_count !== undefined ? repo.stargazers_count : 'N/A';
    const forks = repo.forks_count !== undefined ? repo.forks_count : 'N/A';
    const updatedAt = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'N/A';

    return `
        <div class="repo-card">
            <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
            <p>${description}</p>
            <div class="repo-meta">
                <span>⭐ ${stars}</span>
                <span>🍴 ${forks}</span>
                <span>Updated: ${updatedAt}</span>
            </div>
            <button class="repo-action-button view-details-button" data-repo-name="${repo.name}" data-repo-url="${repo.html_url}">
                View Details
            </button>
        </div>
    `;
}

