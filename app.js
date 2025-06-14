// Global state
let workoutData = {
    progressions: defaultProgressions,
    entries: []
};

// Load data from localStorage on startup
function loadData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            workoutData = JSON.parse(savedData);
        } catch (error) {
            console.error('Failed to parse saved workout data:', error);
        }
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutData));
}

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
    if (workoutData.lastWorkoutDate) {
        const date = new Date(workoutData.lastWorkoutDate);
        lastWorkoutText.textContent = `Last workout: ${date.toLocaleDateString()}`;
    } else {
        lastWorkoutText.textContent = 'Ready to start your first workout?';
    }
    
    // Start workout button
    startWorkoutBtn.onclick = () => {
        document.querySelector('[data-view="logger"]').click();
    };
    
    // Render progressions
    progressionsGrid.innerHTML = workoutData.progressions.map(progression => {
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
    const recentWorkoutsList = document.getElementById('recent-workouts-list');
    
    // Populate progression select
    progressionSelect.innerHTML = '<option value="">Choose a progression...</option>' +
        workoutData.progressions.map(progression => 
            `<option value="${progression.id}">${progression.name}</option>`
        ).join('');
    
    // Handle progression selection
    progressionSelect.onchange = () => {
        const selectedId = progressionSelect.value;
        if (selectedId) {
            const progression = workoutData.progressions.find(p => p.id === selectedId);
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
            const repInput = document.createElement('div');
            repInput.className = 'rep-input';
            repInput.innerHTML = `
                <label>Set ${i}:</label>
                <input type="number" min="0" value="${targetReps}" class="input" data-set="${i}">
                <span>reps</span>
            `;
            repsInputs.appendChild(repInput);
        }
    }
    
    function logWorkout(progression, exercise) {
        const setsCount = parseInt(document.getElementById('sets-count').value);
        const repInputs = document.querySelectorAll('#reps-inputs input');
        const reps = Array.from(repInputs).map(input => parseInt(input.value) || 0);
        
        const entry = {
            id: Date.now().toString(),
            progressionId: progression.id,
            exerciseId: exercise.id,
            date: new Date().toISOString(),
            sets: setsCount,
            reps: reps
        };
        
        workoutData.entries.push(entry);
        workoutData.lastWorkoutDate = new Date().toISOString();
        
        // Check if progression criteria is met
        if (checkProgressionCriteria(entry, exercise)) {
            const newLevel = Math.min(progression.currentLevel + 1, progression.exercises.length - 1);
            const progressionIndex = workoutData.progressions.findIndex(p => p.id === progression.id);
            workoutData.progressions[progressionIndex].currentLevel = newLevel;
            
            if (newLevel > progression.currentLevel) {
                showToast(`Congratulations! Advanced to Level ${newLevel + 1}: ${progression.exercises[newLevel].name}`);
            }
        }
        
        saveData();
        showToast('Workout logged successfully!');
        renderRecentWorkouts();
        
        // Reset form
        progressionSelect.value = '';
        exerciseForm.classList.add('hidden');
    }
    
    function checkProgressionCriteria(entry, exercise) {
        return entry.sets >= exercise.targetSets && 
               entry.reps.every(rep => rep >= exercise.targetReps);
    }
    
    function renderRecentWorkouts() {
        const recentEntries = workoutData.entries
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10);
        
        if (recentEntries.length === 0) {
            recentWorkoutsList.innerHTML = '<p style="color: var(--muted-foreground); text-align: center;">No workouts logged yet</p>';
            return;
        }
        
        recentWorkoutsList.innerHTML = recentEntries.map(entry => {
            const progression = workoutData.progressions.find(p => p.id === entry.progressionId);
            const exercise = progression?.exercises.find(e => e.id === entry.exerciseId);
            const date = new Date(entry.date);
            
            return `
                <div class="workout-entry">
                    <div class="workout-entry-info">
                        <div class="flex items-center gap-2 mb-1">
                            <h4>${exercise?.name || 'Unknown Exercise'}</h4>
                            ${progression ? `<span class="badge ${getCategoryBadgeClass(progression.category)}">${progression.category}</span>` : ''}
                        </div>
                        <p>${entry.sets} sets × ${entry.reps.join(', ')} reps</p>
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

// Render stats view
function renderStats() {
    const statsGrid = document.getElementById('stats-grid');
    const progressionStats = document.getElementById('progression-stats');
    
    const totalWorkouts = workoutData.entries.length;
    const uniqueWorkoutDays = new Set(
        workoutData.entries.map(entry => entry.date.split('T')[0])
    ).size;
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
                <div style="font-size: 2rem; font-weight: 700;">${workoutData.progressions.length}</div>
            </div>
        </div>
    `;
    
    // Render progression statistics
    const progressionStatsHtml = workoutData.progressions.map(progression => {
        const stats = getProgressionStats(progression.id);
        const progressPercentage = ((progression.currentLevel + 1) / progression.exercises.length) * 100;
        
        return `
            <div style="margin-bottom: 1rem;">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span style="font-weight: 500;">${progression.name}</span>
                        <span class="badge ${getCategoryBadgeClass(progression.category)}">${progression.category}</span>
                    </div>
                    <div class="flex items-center gap-2" style="font-size: 0.875rem; color: var(--muted-foreground);">
                        <i data-lucide="target" style="width: 1rem; height: 1rem;"></i>
                        Level ${progression.currentLevel + 1}/${progression.exercises.length}
                    </div>
                </div>
                
                <div class="flex items-center gap-2 mb-2">
                    <div class="progress" style="flex: 1;">
                        <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                    </div>
                    <span style="font-size: 0.875rem; font-weight: 500; min-width: 40px;">
                        ${Math.round(progressPercentage)}%
                    </span>
                </div>
                
                <p style="font-size: 0.875rem; color: var(--muted-foreground);">
                    ${stats.totalWorkouts} workouts completed
                </p>
            </div>
        `;
    }).join('');
    
    progressionStats.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Progression Overview</h3>
                <p class="card-description">Your progress in each exercise category</p>
            </div>
            <div class="card-content">
                ${progressionStatsHtml}
            </div>
        </div>
    `;
    
    initializeIcons();
}

// Get workout streak
function getWorkoutStreak() {
    const sortedDates = Array.from(new Set(
        workoutData.entries.map(entry => entry.date.split('T')[0])
    )).sort().reverse();
    
    if (sortedDates.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    let currentDate = new Date(sortedDates[0]);
    
    const daysDiff = Math.floor((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 1) return 0;
    
    for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i]);
        const daysDifference = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDifference === 1) {
            streak++;
            currentDate = prevDate;
        } else {
            break;
        }
    }
    
    return streak;
}

// Get progression stats
function getProgressionStats(progressionId) {
    const entries = workoutData.entries.filter(e => e.progressionId === progressionId);
    const progression = workoutData.progressions.find(p => p.id === progressionId);
    
    return {
        totalWorkouts: entries.length,
        currentLevel: progression.currentLevel,
        totalLevels: progression.exercises.length,
        recentEntries: entries.slice(-10),
        progressPercentage: ((progression.currentLevel + 1) / progression.exercises.length) * 100
    };
}

// Render progressions view
function renderProgressions() {
    const progressionsList = document.getElementById('progressions-list');
    
    progressionsList.innerHTML = workoutData.progressions.map(progression => {
        const progressPercentage = ((progression.currentLevel + 1) / progression.exercises.length) * 100;
        
        const exercisesHtml = progression.exercises.map((exercise, index) => {
            const isCurrent = index === progression.currentLevel;
            const isUnlocked = index <= progression.currentLevel;
            const isCompleted = index < progression.currentLevel;
            
            let iconHtml = '';
            if (isCompleted) {
                iconHtml = '<i data-lucide="check-circle" style="width: 1.25rem; height: 1.25rem; color: #16a34a;"></i>';
            } else if (isCurrent) {
                iconHtml = '<i data-lucide="target" style="width: 1.25rem; height: 1.25rem; color: var(--primary);"></i>';
            } else {
                iconHtml = '<i data-lucide="lock" style="width: 1.25rem; height: 1.25rem; color: var(--muted-foreground);"></i>';
            }
            
            return `
                <div class="exercise-item ${isCurrent ? 'current' : ''}">
                    <div class="exercise-icon">${iconHtml}</div>
                    <div class="exercise-details" style="flex: 1;">
                        <div class="flex items-center gap-2 mb-1">
                            <h4 style="color: ${isUnlocked ? 'var(--foreground)' : 'var(--muted-foreground)'};">
                                Level ${index + 1}: ${exercise.name}
                            </h4>
                            ${isCurrent ? '<span class="badge badge-default">Current</span>' : ''}
                            ${isCompleted ? '<span class="badge badge-secondary">Completed</span>' : ''}
                        </div>
                        <p style="color: ${isUnlocked ? 'var(--muted-foreground)' : 'var(--muted-foreground)'}; opacity: ${isUnlocked ? '1' : '0.6'};">
                            ${exercise.description}
                        </p>
                        <div class="flex items-center gap-4" style="font-size: 0.875rem; margin-top: 0.5rem;">
                            <span class="exercise-target" style="color: ${isUnlocked ? 'var(--primary)' : 'var(--muted-foreground)'}; opacity: ${isUnlocked ? '1' : '0.6'};">
                                Target: ${exercise.targetSets} sets × ${exercise.targetReps} reps
                            </span>
                            ${!isCompleted ? `
                                <span style="font-size: 0.75rem; color: ${isUnlocked ? 'var(--muted-foreground)' : 'var(--muted-foreground)'}; opacity: ${isUnlocked ? '1' : '0.6'};">
                                    ${exercise.unlockCriteria}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="progression-card">
                <div class="progression-header">
                    <div class="progression-info">
                        <div class="flex items-center gap-2 mb-2">
                            <h3>${progression.name}</h3>
                            <span class="badge ${getCategoryBadgeClass(progression.category)}">${progression.category}</span>
                        </div>
                        <div class="progression-progress">
                            <div class="progress" style="width: 200px;">
                                <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                            </div>
                            <span style="font-size: 0.875rem; color: var(--muted-foreground);">
                                Level ${progression.currentLevel + 1} of ${progression.exercises.length}
                            </span>
                        </div>
                    </div>
                    <div class="progression-actions">
                        <button class="btn btn-outline" onclick="resetProgression('${progression.id}', '${progression.name}')">
                            <i data-lucide="rotate-ccw" style="width: 1rem; height: 1rem;"></i>
                            Reset
                        </button>
                    </div>
                </div>
                <div class="exercise-list">
                    ${exercisesHtml}
                </div>
            </div>
        `;
    }).join('');
    
    initializeIcons();
}

// Reset progression
function resetProgression(progressionId, progressionName) {
    if (confirm(`Are you sure you want to reset "${progressionName}" to level 1?`)) {
        const progressionIndex = workoutData.progressions.findIndex(p => p.id === progressionId);
        workoutData.progressions[progressionIndex].currentLevel = 0;
        saveData();
        showToast(`${progressionName} has been reset to level 1.`);
        renderProgressions();
    }
}

// Initialize the application
function initializeApp() {
    loadData();
    initializeNavigation();
    renderDashboard(); // Start with dashboard view
    initializeIcons();
}

// Start the app when the page loads
document.addEventListener('DOMContentLoaded', initializeApp);