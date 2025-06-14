// GitHub Storage Service
class GitHubStorage {
    constructor() {
        this.baseUrl = 'https://api.github.com';
    }
    
    async saveFile(filename, data) {
        if (!this.isConfigured()) {
            throw new Error('GitHub not configured');
        }

        const token = localStorage.getItem('github_token');
        const owner = localStorage.getItem('github_owner');
        const repo = localStorage.getItem('github_repo');
        
        const content = btoa(JSON.stringify(data, null, 2));
        const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/data/${filename}`;
        
        try {
            // Get current file SHA if it exists
            let sha;
            try {
                const response = await fetch(url, {
                    headers: { 'Authorization': `token ${token}` }
                });
                if (response.ok) {
                    const fileData = await response.json();
                    sha = fileData.sha;
                }
            } catch (e) {
                // File doesn't exist, that's okay
            }

            // Create or update file
            const payload = {
                message: `Update ${filename}`,
                content,
                ...(sha && { sha })
            };

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error saving to GitHub:', error);
            throw error;
        }
    }

    async loadFile(filename) {
        if (!this.isConfigured()) {
            return null;
        }

        const token = localStorage.getItem('github_token');
        const owner = localStorage.getItem('github_owner');
        const repo = localStorage.getItem('github_repo');
        
        const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/data/${filename}`;
        
        try {
            const response = await fetch(url, {
                headers: { 'Authorization': `token ${token}` }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return null; // File doesn't exist
                }
                throw new Error(`GitHub API error: ${response.statusText}`);
            }

            const fileData = await response.json();
            const content = atob(fileData.content);
            return JSON.parse(content);
        } catch (error) {
            console.error('Error loading from GitHub:', error);
            return null;
        }
    }

    isConfigured() {
        const token = localStorage.getItem('github_token');
        const owner = localStorage.getItem('github_owner');
        const repo = localStorage.getItem('github_repo');
        return !!(token && owner && repo);
    }

    configure(token, owner, repo) {
        localStorage.setItem('github_token', token);
        localStorage.setItem('github_owner', owner);
        localStorage.setItem('github_repo', repo);
        window.location.reload(); // Reload to use new config
    }
}

export const githubStorage = new GitHubStorage();