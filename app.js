// Global state - initialize from data.js
let workoutData = {
    progressions: progressions,
    entries: workoutLogs
};

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
    
    function logWorkout(progression, exercise) {
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
        
        workoutData.entries.push(entry);
        workoutLogs.push(entry);
        workoutData.lastWorkoutDate = new Date().toISOString();
        
        // Save data
        saveWorkoutLogs();
        
        // Check if progression criteria is met
        if (checkProgressionCriteria(entry, exercise)) {
            const newLevel = Math.min(progression.currentLevel + 1, progression.exercises.length - 1);
            const progressionIndex = workoutData.progressions.findIndex(p => p.id === progression.id);
            workoutData.progressions[progressionIndex].currentLevel = newLevel;
            progressions[progressionIndex].currentLevel = newLevel;
            
            saveProgressions();
            
            if (newLevel > progression.currentLevel) {
                showToast(`Congratulations! Advanced to Level ${newLevel + 1}: ${progression.exercises[newLevel].name}`);
            }
        }
        
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
    
    // Add create new progression button
    const createButton = `
        <div style="margin-bottom: 2rem; text-align: center;">
            <button class="btn btn-primary" onclick="openProgressionEditor()">
                <i data-lucide="plus" style="width: 1rem; height: 1rem;"></i>
                Create New Progression
            </button>
        </div>
    `;
    
    const progressionsHtml = workoutData.progressions.map(progression => {
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
                        <button class="btn btn-outline" onclick="openLevelChanger(workoutData.progressions.find(p => p.id === '${progression.id}'))">
                            <i data-lucide="settings" style="width: 1rem; height: 1rem;"></i>
                            Change Level
                        </button>
                        <button class="btn btn-outline" onclick="openProgressionEditor(workoutData.progressions.find(p => p.id === '${progression.id}'))">
                            <i data-lucide="edit" style="width: 1rem; height: 1rem;"></i>
                            Edit
                        </button>
                        <button class="btn btn-outline" onclick="resetProgression('${progression.id}', '${progression.name}')">
                            <i data-lucide="rotate-ccw" style="width: 1rem; height: 1rem;"></i>
                            Reset
                        </button>
                        <button class="btn btn-outline" onclick="deleteProgression('${progression.id}', '${progression.name}')" style="color: var(--destructive);">
                            <i data-lucide="trash-2" style="width: 1rem; height: 1rem;"></i>
                            Delete
                        </button>
                    </div>
                </div>
                <div class="exercise-list">
                    ${exercisesHtml}
                </div>
            </div>
        `;
    }).join('');
    
    progressionsList.innerHTML = createButton + progressionsHtml;
    initializeIcons();
}

// Reset progression
function resetProgression(progressionId, progressionName) {
    if (confirm(`Are you sure you want to reset "${progressionName}" to level 1?`)) {
        const progressionIndex = workoutData.progressions.findIndex(p => p.id === progressionId);
        workoutData.progressions[progressionIndex].currentLevel = 0;
        progressions[progressionIndex].currentLevel = 0;
        saveProgressions();
        showToast(`${progressionName} has been reset to level 1.`);
        renderProgressions();
    }
}

// Progression Editor Modal Functions
let currentEditingProgression = null;
let exerciseCounter = 0;

function openProgressionEditor(progression = null) {
    currentEditingProgression = progression;
    const modal = document.getElementById('progression-modal');
    const title = document.getElementById('progression-modal-title');
    const form = document.getElementById('progression-form');
    
    title.textContent = progression ? 'Edit Progression' : 'Create New Progression';
    
    if (progression) {
        document.getElementById('progression-name').value = progression.name;
        document.getElementById('progression-category').value = progression.category;
        populateExercises(progression.exercises);
    } else {
        form.reset();
        document.getElementById('exercises-container').innerHTML = '';
        exerciseCounter = 0;
    }
    
    modal.classList.remove('hidden');
}

function closeProgressionEditor() {
    document.getElementById('progression-modal').classList.add('hidden');
    currentEditingProgression = null;
}

function populateExercises(exercises) {
    const container = document.getElementById('exercises-container');
    container.innerHTML = '';
    exerciseCounter = 0;
    
    exercises.forEach(exercise => {
        addExerciseEditor(exercise);
    });
}

function addExerciseEditor(exercise = null) {
    exerciseCounter++;
    const container = document.getElementById('exercises-container');
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'exercise-editor';
    exerciseDiv.dataset.exerciseId = exerciseCounter;
    
    exerciseDiv.innerHTML = `
        <div class="exercise-editor-header">
            <h4>Level ${exerciseCounter}</h4>
            <button type="button" class="btn btn-outline" onclick="removeExercise(${exerciseCounter})">
                <i data-lucide="trash-2"></i>
                Remove
            </button>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>Exercise Name</label>
                <input type="text" class="input exercise-name" placeholder="e.g., Wall Push-up" value="${exercise?.name || ''}" required>
            </div>
            <div class="form-group">
                <label>Unlock Criteria</label>
                <input type="text" class="input exercise-criteria" placeholder="e.g., Complete 3 sets of 15 reps" value="${exercise?.unlockCriteria || 'Complete target sets and reps'}">
            </div>
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea class="textarea exercise-description" placeholder="Describe how to perform this exercise" required>${exercise?.description || ''}</textarea>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>Target Sets</label>
                <input type="number" class="input exercise-sets" min="1" value="${exercise?.targetSets || 3}" required>
            </div>
            <div class="form-group">
                <label>Target Reps</label>
                <input type="number" class="input exercise-reps" min="1" value="${exercise?.targetReps || 10}" required>
            </div>
        </div>
    `;
    
    container.appendChild(exerciseDiv);
    initializeIcons();
}

function removeExercise(exerciseId) {
    const exerciseElement = document.querySelector(`[data-exercise-id="${exerciseId}"]`);
    if (exerciseElement) {
        exerciseElement.remove();
        updateExerciseNumbers();
    }
}

function updateExerciseNumbers() {
    const exercises = document.querySelectorAll('.exercise-editor');
    exercises.forEach((exercise, index) => {
        const header = exercise.querySelector('h4');
        header.textContent = `Level ${index + 1}`;
    });
}

function saveProgression() {
    const name = document.getElementById('progression-name').value.trim();
    const category = document.getElementById('progression-category').value;
    const exerciseElements = document.querySelectorAll('.exercise-editor');
    
    if (!name) {
        showToast('Progression name is required');
        return;
    }
    
    if (exerciseElements.length === 0) {
        showToast('At least one exercise is required');
        return;
    }
    
    const exercises = Array.from(exerciseElements).map((element, index) => {
        const nameInput = element.querySelector('.exercise-name');
        const descInput = element.querySelector('.exercise-description');
        const criteriaInput = element.querySelector('.exercise-criteria');
        const setsInput = element.querySelector('.exercise-sets');
        const repsInput = element.querySelector('.exercise-reps');
        
        if (!nameInput.value.trim() || !descInput.value.trim()) {
            throw new Error('All exercises must have a name and description');
        }
        
        return {
            id: currentEditingProgression?.exercises[index]?.id || `exercise-${Date.now()}-${index}`,
            name: nameInput.value.trim(),
            description: descInput.value.trim(),
            unlockCriteria: criteriaInput.value.trim() || 'Complete target sets and reps',
            targetSets: parseInt(setsInput.value) || 3,
            targetReps: parseInt(repsInput.value) || 10
        };
    });
    
    try {
        const progression = {
            id: currentEditingProgression?.id || Date.now().toString(),
            name: name,
            category: category,
            currentLevel: currentEditingProgression?.currentLevel || 0,
            exercises: exercises
        };
        
        if (currentEditingProgression) {
            const index = workoutData.progressions.findIndex(p => p.id === currentEditingProgression.id);
            const progressionIndex = progressions.findIndex(p => p.id === currentEditingProgression.id);
            workoutData.progressions[index] = progression;
            progressions[progressionIndex] = progression;
            showToast('Progression updated successfully');
        } else {
            workoutData.progressions.push(progression);
            progressions.push(progression);
            showToast('Progression created successfully');
        }
        
        saveProgressions();
        closeProgressionEditor();
        renderView(document.querySelector('.nav-btn.active').dataset.view);
    } catch (error) {
        showToast(error.message);
    }
}

function deleteProgression(progressionId, progressionName) {
    if (confirm(`Are you sure you want to delete "${progressionName}"? This will also delete all related workout entries.`)) {
        workoutData.progressions = workoutData.progressions.filter(p => p.id !== progressionId);
        workoutData.entries = workoutData.entries.filter(e => e.progressionId !== progressionId);
        progressions = progressions.filter(p => p.id !== progressionId);
        workoutLogs = workoutLogs.filter(e => e.progressionId !== progressionId);
        
        saveProgressions();
        saveWorkoutLogs();
        showToast(`${progressionName} has been deleted.`);
        renderProgressions();
    }
}

// Level Changer Modal Functions
let currentLevelProgression = null;

function openLevelChanger(progression) {
    currentLevelProgression = progression;
    const modal = document.getElementById('level-modal');
    const title = document.getElementById('level-modal-title');
    const selector = document.getElementById('level-selector');
    
    title.textContent = `Change Exercise Level - ${progression.name}`;
    
    selector.innerHTML = progression.exercises.map((exercise, index) => {
        const isCurrent = index === progression.currentLevel;
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
            <div class="level-option ${isCurrent ? 'current' : ''}" onclick="changeLevel(${index})">
                <div class="level-icon">${iconHtml}</div>
                <div style="flex: 1;">
                    <div class="flex items-center gap-2 mb-1">
                        <h4 style="font-weight: 600;">Level ${index + 1}: ${exercise.name}</h4>
                        ${isCurrent ? '<span class="badge badge-default">Current</span>' : ''}
                        ${isCompleted ? '<span class="badge badge-secondary">Completed</span>' : ''}
                    </div>
                    <p style="color: var(--muted-foreground); font-size: 0.875rem; margin-bottom: 0.5rem;">
                        ${exercise.description}
                    </p>
                    <div style="color: var(--primary); font-weight: 500; font-size: 0.875rem;">
                        Target: ${exercise.targetSets} sets × ${exercise.targetReps} reps
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    modal.classList.remove('hidden');
    initializeIcons();
}

function closeLevelChanger() {
    document.getElementById('level-modal').classList.add('hidden');
    currentLevelProgression = null;
}

function changeLevel(newLevel) {
    if (currentLevelProgression) {
        const progressionIndex = workoutData.progressions.findIndex(p => p.id === currentLevelProgression.id);
        const progressionIndexData = progressions.findIndex(p => p.id === currentLevelProgression.id);
        workoutData.progressions[progressionIndex].currentLevel = newLevel;
        progressions[progressionIndexData].currentLevel = newLevel;
        saveProgressions();
        showToast(`Now at Level ${newLevel + 1}: ${currentLevelProgression.exercises[newLevel].name}`);
        closeLevelChanger();
        renderView(document.querySelector('.nav-btn.active').dataset.view);
    }
}

// Initialize modal event listeners
function initializeModals() {
    // Progression editor modal
    document.getElementById('add-exercise-btn').addEventListener('click', () => addExerciseEditor());
    document.getElementById('cancel-progression-btn').addEventListener('click', closeProgressionEditor);
    document.getElementById('save-progression-btn').addEventListener('click', saveProgression);
    
    // Level changer modal
    document.getElementById('cancel-level-btn').addEventListener('click', closeLevelChanger);
    
    // Close modals when clicking outside
    document.getElementById('progression-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeProgressionEditor();
    });
    
    document.getElementById('level-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeLevelChanger();
    });
}

// Initialize the application
async function initializeApp() {
    // Load GitHub storage first
    await loadGitHubStorage();
    
    // Check if GitHub is configured, if not show config screen
    if (window.githubStorage && !window.githubStorage.isConfigured()) {
        showGitHubConfig();
        return;
    }
    
    // Load data from GitHub/localStorage
    await initializeData();
    
    // Update workoutData from loaded data
    workoutData.progressions = progressions;
    workoutData.entries = workoutLogs;
    
    renderApp();
}

function renderApp() {
    initializeNavigation();
    initializeModals();
    renderDashboard(); // Start with dashboard view
    initializeIcons();
}

function showGitHubConfig() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; background: var(--background);">
            <div style="width: 100%; max-width: 400px; background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
                <h2 style="color: var(--foreground); margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Configure GitHub Storage</h2>
                <p style="color: var(--muted-foreground); margin: 0 0 1.5rem 0; font-size: 0.875rem;">Set up GitHub as your database to sync workout data across devices</p>
                
                <form id="github-config-form" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="color: var(--foreground); font-size: 0.875rem; font-weight: 500; display: block; margin-bottom: 0.5rem;">GitHub Personal Access Token</label>
                        <input type="password" id="github-token" placeholder="ghp_xxxxxxxxxxxx" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px; background: var(--background); color: var(--foreground);" />
                        <p style="color: var(--muted-foreground); font-size: 0.75rem; margin-top: 0.25rem;">Create a token at GitHub Settings → Developer settings → Personal access tokens</p>
                    </div>
                    
                    <div>
                        <label style="color: var(--foreground); font-size: 0.875rem; font-weight: 500; display: block; margin-bottom: 0.5rem;">Repository Owner</label>
                        <input type="text" id="github-owner" placeholder="your-username" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px; background: var(--background); color: var(--foreground);" />
                    </div>
                    
                    <div>
                        <label style="color: var(--foreground); font-size: 0.875rem; font-weight: 500; display: block; margin-bottom: 0.5rem;">Repository Name</label>
                        <input type="text" id="github-repo" placeholder="workout-tracker-data" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px; background: var(--background); color: var(--foreground);" />
                    </div>
                    
                    <div id="github-error" style="display: none; padding: 0.75rem; background: var(--destructive); color: var(--destructive-foreground); border-radius: 4px; font-size: 0.875rem;"></div>
                    
                    <button type="submit" style="width: 100%; padding: 0.75rem; background: var(--primary); color: var(--primary-foreground); border: none; border-radius: 4px; font-weight: 500; cursor: pointer;">Configure GitHub Storage</button>
                </form>
                
                <div style="margin-top: 1.5rem; font-size: 0.875rem; color: var(--muted-foreground);">
                    <p style="font-weight: 600; margin: 0 0 0.5rem 0;">Setup Instructions:</p>
                    <ol style="margin: 0; padding-left: 1.25rem;">
                        <li>Create a GitHub repository for storing workout data</li>
                        <li>Generate a Personal Access Token with 'repo' permissions</li>
                        <li>Enter your details above to sync data across devices</li>
                    </ol>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('github-config-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const token = document.getElementById('github-token').value;
        const owner = document.getElementById('github-owner').value;
        const repo = document.getElementById('github-repo').value;
        const errorDiv = document.getElementById('github-error');
        
        if (!token || !owner || !repo) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'All fields are required';
            return;
        }
        
        try {
            localStorage.setItem('github_token', token);
            localStorage.setItem('github_owner', owner);
            localStorage.setItem('github_repo', repo);
            window.location.reload();
        } catch (err) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Failed to configure GitHub storage';
        }
    });
}

// Start the app when the page loads
document.addEventListener('DOMContentLoaded', initializeApp);