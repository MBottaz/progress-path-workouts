// GitHub Storage Service
const GITHUB_TOKEN = localStorage.getItem('github_token') || '';
const REPO_OWNER = localStorage.getItem('github_owner') || '';
const REPO_NAME = localStorage.getItem('github_repo') || '';

interface GitHubFile {
  name: string;
  content: string;
  sha?: string;
}

class GitHubStorage {
  private baseUrl = 'https://api.github.com';
  
  async saveFile(filename: string, data: any): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('GitHub not configured');
    }

    const content = btoa(JSON.stringify(data, null, 2));
    const url = `${this.baseUrl}/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/${filename}`;
    
    try {
      // Get current file SHA if it exists
      let sha: string | undefined;
      try {
        const response = await fetch(url, {
          headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        if (response.ok) {
          const fileData = await response.json();
          sha = fileData.sha;
        }
      } catch (e) {
        // File doesn't exist, that's okay
      }

      // Create or update file
      const payload: any = {
        message: `Update ${filename}`,
        content,
        ...(sha && { sha })
      };

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
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

  async loadFile(filename: string): Promise<any> {
    if (!this.isConfigured()) {
      return null;
    }

    const url = `${this.baseUrl}/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/${filename}`;
    
    try {
      const response = await fetch(url, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
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

  isConfigured(): boolean {
    return !!(GITHUB_TOKEN && REPO_OWNER && REPO_NAME);
  }

  configure(token: string, owner: string, repo: string): void {
    localStorage.setItem('github_token', token);
    localStorage.setItem('github_owner', owner);
    localStorage.setItem('github_repo', repo);
    window.location.reload(); // Reload to use new config
  }
}

export const githubStorage = new GitHubStorage();