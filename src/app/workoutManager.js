// Workout data manager with GitHub sync
import { WorkoutStorage } from '../data/storage.js';
import { defaultProgressions } from '../data/progressions.js';

export class WorkoutManager {
    constructor() {
        this.storage = new WorkoutStorage();
        this.progressions = [];
        this.workoutLogs = [];
        this.lastWorkoutDate = null;
        this.initialized = false;
    }

    // Initialize the workout manager
    async initialize() {
        if (this.initialized) return;
        
        try {
            // Initialize GitHub storage
            await this.storage.initGitHubStorage();
            
            // Load data
            await this.loadData();
            
            this.initialized = true;
            console.log('WorkoutManager initialized');
        } catch (error) {
            console.error('Failed to initialize WorkoutManager:', error);
            // Continue with default data if initialization fails
            this.progressions = [...defaultProgressions];
            this.workoutLogs = [];
            this.initialized = true;
        }
    }

    // Load all data
    async loadData() {
        try {
            this.progressions = await this.storage.loadProgressions(defaultProgressions);
            this.workoutLogs = await this.storage.loadWorkoutLogs();
            
            // Update last workout date
            if (this.workoutLogs.length > 0) {
                const latestLog = this.workoutLogs.reduce((latest, log) => 
                    new Date(log.date) > new Date(latest.date) ? log : latest
                );
                this.lastWorkoutDate = latestLog.date;
            }
        } catch (error) {
            console.error('Failed to load data:', error);
            throw error;
        }
    }

    // Save progressions
    async saveProgressions() {
        try {
            await this.storage.saveProgressions(this.progressions);
        } catch (error) {
            console.error('Failed to save progressions:', error);
            // Still update local data even if GitHub save fails
        }
    }

    // Save workout logs
    async saveWorkoutLogs() {
        try {
            await this.storage.saveWorkoutLogs(this.workoutLogs);
        } catch (error) {
            console.error('Failed to save workout logs:', error);
            // Still update local data even if GitHub save fails
        }
    }

    // Add a workout entry
    async addWorkoutEntry(entry) {
        this.workoutLogs.push(entry);
        this.lastWorkoutDate = entry.date;
        await this.saveWorkoutLogs();
    }

    // Update progression level
    async updateProgressionLevel(progressionId, newLevel) {
        const progressionIndex = this.progressions.findIndex(p => p.id === progressionId);
        if (progressionIndex !== -1) {
            this.progressions[progressionIndex].currentLevel = newLevel;
            await this.saveProgressions();
        }
    }

    // Get progression by ID
    getProgression(id) {
        return this.progressions.find(p => p.id === id);
    }

    // Get all progressions
    getProgressions() {
        return this.progressions;
    }

    // Get workout logs
    getWorkoutLogs() {
        return this.workoutLogs;
    }

    // Get last workout date
    getLastWorkoutDate() {
        return this.lastWorkoutDate;
    }

    // Check if GitHub is configured
    isGitHubConfigured() {
        return this.storage.isGitHubConfigured();
    }

    // Force sync with GitHub
    async syncWithGitHub() {
        if (!this.storage.isGitHubConfigured()) {
            throw new Error('GitHub not configured');
        }
        
        try {
            await this.loadData();
            return true;
        } catch (error) {
            console.error('Failed to sync with GitHub:', error);
            throw error;
        }
    }
}