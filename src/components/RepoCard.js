// src/components/RepoCard.js
import './styles.css'; // Assume component-specific styles

/**
 * A simple component to display GitHub repository information.
 * @param {object} props - Component props.
 * @param {object} props.repo - The repository object from the GitHub API.
 * @returns {string} HTML string representing the repo card.
 */
export function RepoCard({ repo }) {
    if (!repo) {
        return `<div class="repo-card">No repository data.</div>`;
    }

    return `
        <div class="repo-card">
            <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
            <p>${repo.description || 'No description provided.'}</p>
            <div class="repo-meta">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            <button class="repo-action-button" onclick="alert('Implement view/edit logic for ${repo.name}')">View Details</button>
        </div>
    `;
}
