// Storage utilities for handling localStorage and GitHub sync
export class WorkoutStorage {
    constructor() {
        this.PROGRESSIONS_KEY = 'workout_progressions';
        this.WORKOUT_LOGS_KEY = 'workout_logs';
        this.githubStorage = null;
    }

    // Initialize GitHub storage if available
    async initGitHubStorage() {
        try {
            const module = await import('../lib/githubStorage.js');
            this.githubStorage = module.githubStorage;
            console.log('GitHub storage initialized');
        } catch (error) {
            console.log('GitHub storage not available, using localStorage only');
        }
    }

    // Save progressions to both localStorage and GitHub
    async saveProgressions(progressions) {
        localStorage.setItem(this.PROGRESSIONS_KEY, JSON.stringify(progressions));
        
        if (this.githubStorage && this.githubStorage.isConfigured()) {
            try {
                await this.githubStorage.saveFile('progressions.json', progressions);
                console.log('Progressions saved to GitHub');
            } catch (error) {
                console.error('Failed to save progressions to GitHub:', error);
                throw error;
            }
        }
    }

    // Load progressions from GitHub first, fallback to localStorage
    async loadProgressions(defaultProgressions) {
        if (this.githubStorage && this.githubStorage.isConfigured()) {
            try {
                const githubData = await this.githubStorage.loadFile('progressions.json');
                if (githubData) {
                    localStorage.setItem(this.PROGRESSIONS_KEY, JSON.stringify(githubData));
                    console.log('Progressions loaded from GitHub');
                    return githubData;
                }
            } catch (error) {
                console.error('Failed to load progressions from GitHub:', error);
            }
        }
        
        const saved = localStorage.getItem(this.PROGRESSIONS_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error('Failed to parse progressions from localStorage:', error);
                return [...defaultProgressions];
            }
        }
        
        return [...defaultProgressions];
    }

    // Save workout logs to both localStorage and GitHub
    async saveWorkoutLogs(workoutLogs) {
        localStorage.setItem(this.WORKOUT_LOGS_KEY, JSON.stringify(workoutLogs));
        
        if (this.githubStorage && this.githubStorage.isConfigured()) {
            try {
                await this.githubStorage.saveFile('workout-logs.json', workoutLogs);
                console.log('Workout logs saved to GitHub');
            } catch (error) {
                console.error('Failed to save workout logs to GitHub:', error);
                throw error;
            }
        }
    }

    // Load workout logs from GitHub first, fallback to localStorage
    async loadWorkoutLogs() {
        if (this.githubStorage && this.githubStorage.isConfigured()) {
            try {
                const githubData = await this.githubStorage.loadFile('workout-logs.json');
                if (githubData) {
                    localStorage.setItem(this.WORKOUT_LOGS_KEY, JSON.stringify(githubData));
                    console.log('Workout logs loaded from GitHub');
                    return githubData;
                }
            } catch (error) {
                console.error('Failed to load workout logs from GitHub:', error);
            }
        }
        
        const saved = localStorage.getItem(this.WORKOUT_LOGS_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error('Failed to parse workout logs from localStorage:', error);
                return [];
            }
        }
        
        return [];
    }

    // Check if GitHub is configured
    isGitHubConfigured() {
        return this.githubStorage && this.githubStorage.isConfigured();
    }
}