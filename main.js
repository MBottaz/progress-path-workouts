// Main application entry point
import { WorkoutManager } from './src/app/workoutManager.js';
import { githubStorage } from './src/lib/githubStorage.js';

// Global workout manager instance
let workoutManager;

// Initialize Lucide icons
function initializeIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Check if GitHub is configured, redirect to setup if not
function checkGitHubSetup() {
    if (!githubStorage.isConfigured()) {
        const shouldSetup = confirm(
            'GitHub storage is not configured. Would you like to set it up for cross-device sync?\n\n' +
            'Click OK to set up GitHub sync, or Cancel to use local storage only.'
        );
        
        if (shouldSetup) {
            window.location.href = 'github-setup.html';
            return false;
        }
    }
    return true;
}

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetView = button.dataset.view;
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target view
            views.forEach(view => view.classList.remove('active'));
            document.getElementById(`${targetView}-view`).classList.add('active');
            
            // Render view content
            renderView(targetView);
        });
    });
    
    // Toast close functionality
    document.getElementById('toast-close').addEventListener('click', () => {
        document.getElementById('toast').classList.add('hidden');
    });
}

// Render specific view
function renderView(viewName) {
    switch (viewName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'logger':
            renderLogger();
            break;
        case 'stats':
            renderStats();
            break;
        case 'progressions':
            renderProgressions();
            break;
    }
}

// Get category badge class
function getCategoryBadgeClass(category) {
    const classes = {
        'Push': 'badge-push',
        'Pull': 'badge-pull', 
        'Legs': 'badge-legs',
        'Core': 'badge-core'
    };
    return classes[category] || 'badge-secondary';
}

// Render dashboard view
function renderDashboard() {
    const progressionsGrid = document.getElementById('progressions-grid');
    const lastWorkoutText = document.getElementById('last-workout-text');
    const startWorkoutBtn = document.getElementById('start-workout-btn');
    
    // Update last workout text
    const lastWorkoutDate = workoutManager.getLastWorkoutDate();
    if (lastWorkoutDate) {
        const date = new Date(lastWorkoutDate);
        lastWorkoutText.textContent = `Last workout: ${date.toLocaleDateString()}`;
    } else {
        lastWorkoutText.textContent = 'Ready to start your first workout?';
    }
    
    // Start workout button
    startWorkoutBtn.onclick = () => {
        document.querySelector('[data-view="logger"]').click();
    };
    
    // Render progressions
    const progressions = workoutManager.getProgressions();
    progressionsGrid.innerHTML = progressions.map(progression => {
        const currentExercise = progression.exercises[progression.currentLevel];
        const nextExercise = progression.exercises[progression.currentLevel + 1];
        const progressPercentage = ((progression.currentLevel + 1) / progression.exercises.length) * 100;
        const isCompleted = progression.currentLevel === progression.exercises.length - 1;
        
        return `
            <div class="card">
                <div class="card-header">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="card-title">${progression.name}</h3>
                        <span class="badge ${getCategoryBadgeClass(progression.category)}">${progression.category}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="progress" style="width: 200px;">
                            <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                        </div>
                        <span style="font-size: 0.875rem; color: var(--muted-foreground);">
                            Level ${progression.currentLevel + 1}/${progression.exercises.length}
                        </span>
                    </div>
                </div>
                
                <div class="card-content">
                    <div style="margin-bottom: 1rem;">
                        <div class="flex items-center gap-2 mb-2">
                            <i data-lucide="target" style="width: 1rem; height: 1rem; color: var(--primary);"></i>
                            <span style="font-weight: 500;">Current Exercise</span>
                        </div>
                        <div style="padding-left: 1.5rem;">
                            <h4 style="font-weight: 600; color: var(--foreground); margin-bottom: 0.25rem;">${currentExercise.name}</h4>
                            <p style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">${currentExercise.description}</p>
                            <p style="font-size: 0.875rem; font-weight: 500; color: var(--primary);">
                                Target: ${currentExercise.targetSets} sets × ${currentExercise.targetReps} reps
                            </p>
                        </div>
                    </div>

                    ${nextExercise && !isCompleted ? `
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem;">
                            <div class="flex items-center gap-2 mb-2">
                                <i data-lucide="chevron-right" style="width: 1rem; height: 1rem; color: var(--muted-foreground);"></i>
                                <span style="font-weight: 500; color: var(--muted-foreground);">Next Exercise</span>
                            </div>
                            <div style="padding-left: 1.5rem;">
                                <h4 style="font-weight: 600; color: var(--muted-foreground); margin-bottom: 0.25rem;">${nextExercise.name}</h4>
                                <p style="font-size: 0.875rem; color: var(--muted-foreground);">${currentExercise.unlockCriteria}</p>
                            </div>
                        </div>
                    ` : ''}

                    ${isCompleted ? `
                        <div class="flex items-center gap-2" style="color: #16a34a; border-top: 1px solid var(--border); padding-top: 1rem;">
                            <i data-lucide="trophy" style="width: 1rem; height: 1rem;"></i>
                            <span style="font-weight: 500;">Progression Completed!</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    initializeIcons();
}

// Render logger view
function renderLogger() {
    const progressionSelect = document.getElementById('progression-select');
    const exerciseForm = document.getElementById('exercise-form');
    
    // Populate progression select
    const progressions = workoutManager.getProgressions();
    progressionSelect.innerHTML = '<option value="">Choose a progression...</option>' +
        progressions.map(progression => 
            `<option value="${progression.id}">${progression.name}</option>`
        ).join('');
    
    // Handle progression selection
    progressionSelect.onchange = () => {
        const selectedId = progressionSelect.value;
        if (selectedId) {
            const progression = workoutManager.getProgression(selectedId);
            const currentExercise = progression.exercises[progression.currentLevel];
            showExerciseForm(progression, currentExercise);
        } else {
            exerciseForm.classList.add('hidden');
        }
    };
    
    // Render recent workouts
    renderRecentWorkouts();
    
    function showExerciseForm(progression, exercise) {
        exerciseForm.classList.remove('hidden');
        
        document.getElementById('exercise-name').textContent = exercise.name;
        document.getElementById('exercise-description').textContent = exercise.description;
        document.getElementById('exercise-target').textContent = `Target: ${exercise.targetSets} sets × ${exercise.targetReps} reps`;
        
        const setsCount = document.getElementById('sets-count');
        setsCount.value = exercise.targetSets;
        
        generateRepsInputs(exercise.targetSets, exercise.targetReps);
        
        setsCount.onchange = () => {
            generateRepsInputs(parseInt(setsCount.value), exercise.targetReps);
        };
        
        document.getElementById('log-workout-btn').onclick = () => {
            logWorkout(progression, exercise);
        };
    }
    
    function generateRepsInputs(setsCount, targetReps) {
        const repsInputs = document.getElementById('reps-inputs');
        repsInputs.innerHTML = '';
        
        for (let i = 1; i <= setsCount; i++) {
            const setDiv = document.createElement('div');
            setDiv.className = 'set-input';
            setDiv.innerHTML = `
                <div class="set-header">
                    <label>Set ${i}</label>
                </div>
                <div class="set-fields">
                    <div class="field-group">
                        <label>Reps:</label>
                        <input type="number" id="set-${i}-reps" min="0" value="${targetReps}" class="input" placeholder="Reps">
                    </div>
                    <div class="field-group">
                        <label>Weight (optional):</label>
                        <input type="number" id="set-${i}-weight" min="0" step="0.5" class="input" placeholder="kg/lbs">
                    </div>
                </div>
            `;
            repsInputs.appendChild(setDiv);
        }
    }
    
    async function logWorkout(progression, exercise) {
        const setsCount = parseInt(document.getElementById('sets-count').value);
        const reps = [];
        const weights = [];
        let hasValidReps = false;
        
        for (let i = 1; i <= setsCount; i++) {
            const repsInput = document.getElementById(`set-${i}-reps`);
            const weightInput = document.getElementById(`set-${i}-weight`);
            const repsValue = parseInt(repsInput.value) || 0;
            const weightValue = parseFloat(weightInput.value) || null;
            
            reps.push(repsValue);
            weights.push(weightValue);
            if (repsValue > 0) hasValidReps = true;
        }
        
        if (!hasValidReps) {
            showToast('Please enter at least one set with reps');
            return;
        }
        
        const entry = {
            id: Date.now().toString(),
            progressionId: progression.id,
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            date: new Date().toISOString(),
            sets: setsCount,
            reps: reps,
            weights: weights.some(w => w !== null) ? weights : null
        };
        
        try {
            await workoutManager.addWorkoutEntry(entry);
            
            // Check if progression criteria is met
            if (checkProgressionCriteria(entry, exercise)) {
                const newLevel = Math.min(progression.currentLevel + 1, progression.exercises.length - 1);
                await workoutManager.updateProgressionLevel(progression.id, newLevel);
                
                if (newLevel > progression.currentLevel) {
                    showToast(`Congratulations! Advanced to Level ${newLevel + 1}: ${progression.exercises[newLevel].name}`);
                }
            }
            
            showToast('Workout logged successfully!');
            renderRecentWorkouts();
            
            // Reset form
            progressionSelect.value = '';
            exerciseForm.classList.add('hidden');
        } catch (error) {
            console.error('Failed to log workout:', error);
            showToast('Failed to save workout. Please try again.');
        }
    }
    
    function checkProgressionCriteria(entry, exercise) {
        return entry.sets >= exercise.targetSets && 
               entry.reps.every(rep => rep >= exercise.targetReps);
    }
    
    function renderRecentWorkouts() {
        const recentWorkoutsList = document.getElementById('recent-workouts-list');
        const workoutLogs = workoutManager.getWorkoutLogs();
        const progressions = workoutManager.getProgressions();
        
        const recentEntries = workoutLogs
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10);
        
        if (recentEntries.length === 0) {
            recentWorkoutsList.innerHTML = '<p style="color: var(--muted-foreground); text-align: center;">No workouts logged yet</p>';
            return;
        }
        
        recentWorkoutsList.innerHTML = recentEntries.map(entry => {
            const progression = progressions.find(p => p.id === entry.progressionId);
            const exercise = progression?.exercises.find(e => e.id === entry.exerciseId);
            const date = new Date(entry.date);
            
            const weightInfo = entry.weights && entry.weights.some(w => w !== null) 
                ? ` | Weights: ${entry.weights.map(w => w ? w + 'kg' : '-').join(', ')}`
                : '';
            
            return `
                <div class="workout-entry">
                    <div class="workout-entry-info">
                        <div class="flex items-center gap-2 mb-1">
                            <h4>${exercise?.name || entry.exerciseName || 'Unknown Exercise'}</h4>
                            ${progression ? `<span class="badge ${getCategoryBadgeClass(progression.category)}">${progression.category}</span>` : ''}
                        </div>
                        <p>${entry.sets} sets × ${entry.reps.join(', ')} reps${weightInfo}</p>
                    </div>
                    <div class="workout-entry-date">
                        <p>${date.toLocaleDateString()}</p>
                        <p>${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Calculate workout streak
function getWorkoutStreak() {
    const workoutLogs = workoutManager.getWorkoutLogs();
    if (workoutLogs.length === 0) return 0;
    
    const uniqueDays = [...new Set(workoutLogs.map(log => log.date.split('T')[0]))].sort().reverse();
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const dayStr of uniqueDays) {
        const workoutDate = new Date(dayStr);
        const diffTime = currentDate.getTime() - workoutDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === streak || (streak === 0 && diffDays <= 1)) {
            streak++;
            currentDate = new Date(workoutDate);
        } else {
            break;
        }
    }
    
    return streak;
}

// Get progression statistics
function getProgressionStats(progressionId) {
    const workoutLogs = workoutManager.getWorkoutLogs();
    const entries = workoutLogs.filter(entry => entry.progressionId === progressionId);
    
    return {
        totalWorkouts: entries.length,
        totalSets: entries.reduce((sum, entry) => sum + entry.sets, 0),
        totalReps: entries.reduce((sum, entry) => sum + entry.reps.reduce((a, b) => a + b, 0), 0),
        lastWorkout: entries.length > 0 ? Math.max(...entries.map(e => new Date(e.date).getTime())) : null
    };
}

// Render stats view
function renderStats() {
    const statsGrid = document.getElementById('stats-grid');
    const progressionStats = document.getElementById('progression-stats');
    const workoutLogs = workoutManager.getWorkoutLogs();
    const progressions = workoutManager.getProgressions();
    
    const totalWorkouts = workoutLogs.length;
    const uniqueWorkoutDays = new Set(workoutLogs.map(entry => entry.date.split('T')[0])).size;
    const workoutStreak = getWorkoutStreak();
    
    // Render overview stats
    statsGrid.innerHTML = `
        <div class="card">
            <div class="card-header">
                <div class="flex items-center justify-between">
                    <h3 style="font-size: 0.875rem; font-weight: 500;">Total Workouts</h3>
                    <i data-lucide="activity" style="width: 1rem; height: 1rem; color: var(--muted-foreground);"></i>
                </div>
            </div>
            <div class="card-content">
                <div style="font-size: 2rem; font-weight: 700;">${totalWorkouts}</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="flex items-center justify-between">
                    <h3 style="font-size: 0.875rem; font-weight: 500;">Workout Days</h3>
                    <i data-lucide="calendar" style="width: 1rem; height: 1rem; color: var(--muted-foreground);"></i>
                </div>
            </div>
            <div class="card-content">
                <div style="font-size: 2rem; font-weight: 700;">${uniqueWorkoutDays}</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="flex items-center justify-between">
                    <h3 style="font-size: 0.875rem; font-weight: 500;">Current Streak</h3>
                    <i data-lucide="trending-up" style="width: 1rem; height: 1rem; color: var(--muted-foreground);"></i>
                </div>
            </div>
            <div class="card-content">
                <div style="font-size: 2rem; font-weight: 700;">${workoutStreak}</div>
                <p style="font-size: 0.75rem; color: var(--muted-foreground);">days</p>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <div class="flex items-center justify-between">
                    <h3 style="font-size: 0.875rem; font-weight: 500;">Progressions</h3>
                    <i data-lucide="trophy" style="width: 1rem; height: 1rem; color: var(--muted-foreground);"></i>
                </div>
            </div>
            <div class="card-content">
                <div style="font-size: 2rem; font-weight: 700;">${progressions.length}</div>
            </div>
        </div>
    `;
    
    // Render progression statistics
    const progressionStatsHtml = progressions.map(progression => {
        const stats = getProgressionStats(progression.id);
        const progressPercentage = ((progression.currentLevel + 1) / progression.exercises.length) * 100;
        
        return `
            <div style="margin-bottom: 1rem;">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span style="font-weight: 500;">${progression.name}</span>
                        <span class="badge ${getCategoryBadgeClass(progression.category)}">${progression.category}</span>
                    </div>
                    <span style="font-size: 0.875rem; color: var(--muted-foreground);">
                        ${stats.totalWorkouts} workouts
                    </span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                    <div class="progress" style="flex: 1;">
                        <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                    </div>
                    <span style="font-size: 0.875rem; color: var(--muted-foreground); min-width: 3rem;">
                        ${Math.round(progressPercentage)}%
                    </span>
                </div>
                <div style="font-size: 0.75rem; color: var(--muted-foreground);">
                    Level ${progression.currentLevel + 1}/${progression.exercises.length} • 
                    ${stats.totalSets} sets • ${stats.totalReps} reps
                </div>
            </div>
        `;
    }).join('');
    
    progressionStats.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Progression Details</h3>
            </div>
            <div class="card-content">
                ${progressionStatsHtml}
            </div>
        </div>
    `;
    
    initializeIcons();
}

// Simplified progressions view (just display, no editing for now)
function renderProgressions() {
    const progressionsList = document.getElementById('progressions-list');
    const progressions = workoutManager.getProgressions();
    
    progressionsList.innerHTML = progressions.map(progression => {
        const exercisesHtml = progression.exercises.map((exercise, index) => {
            const isCurrent = index === progression.currentLevel;
            const isCompleted = index < progression.currentLevel;
            
            return `
                <div class="exercise-item ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}">
                    <div class="exercise-info">
                        <h4>${exercise.name}</h4>
                        <p>${exercise.description}</p>
                        <p><strong>Target:</strong> ${exercise.targetSets} sets × ${exercise.targetReps} reps</p>
                        <p><strong>Unlock criteria:</strong> ${exercise.unlockCriteria}</p>
                    </div>
                    <div class="exercise-status">
                        ${isCurrent ? '<span class="status-badge current">Current</span>' : ''}
                        ${isCompleted ? '<span class="status-badge completed">✓</span>' : ''}
                        ${index > progression.currentLevel ? '<span class="status-badge locked">🔒</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="card progression-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h3 class="card-title">${progression.name}</h3>
                        <span class="badge ${getCategoryBadgeClass(progression.category)}">${progression.category}</span>
                    </div>
                </div>
                <div class="card-content">
                    <div class="exercises-list">
                        ${exercisesHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize the application
async function initializeApp() {
    try {
        // Check if GitHub setup is needed
        if (!checkGitHubSetup()) {
            return;
        }
        
        // Initialize workout manager
        workoutManager = new WorkoutManager();
        await workoutManager.initialize();
        
        // Initialize navigation
        initializeNavigation();
        
        // Render initial view
        renderDashboard();
        initializeIcons();
        
        console.log('Application initialized successfully');
        
        // Add sync status indicator if GitHub is configured
        if (workoutManager.isGitHubConfigured()) {
            showToast('Connected to GitHub - data will sync across devices');
        }
    } catch (error) {
        console.error('Failed to initialize application:', error);
        showToast('Failed to initialize app. Some features may not work.');
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);