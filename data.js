// Storage keys
const PROGRESSIONS_KEY = 'workout_progressions';
const WORKOUT_LOGS_KEY = 'workout_logs';

// BWSF Progressions Data
const defaultProgressions = [
  {
    id: "pushups",
    name: "Pushup Progression", 
    category: "Push",
    currentLevel: 0,
    exercises: [
      {
        id: "wall-pushup",
        name: "Wall Pushup",
        description: "Stand arm's length from a wall. Place palms against wall at shoulder height and width. Keep body straight and push away from wall.",
        targetReps: 50,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 50 reps"
      },
      {
        id: "incline-pushup",
        name: "Incline Pushup", 
        description: "Place hands on an elevated surface (bench, step, etc.). Keep body straight and perform pushup motion.",
        targetReps: 40,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 40 reps"
      },
      {
        id: "kneeling-pushup",
        name: "Kneeling Pushup",
        description: "Perform pushup from knees instead of toes. Keep straight line from knees to head.",
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 30 reps"
      },
      {
        id: "half-pushup",
        name: "Half Pushup",
        description: "Perform pushup lowering only halfway down. Focus on proper form and control.",
        targetReps: 25,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 25 reps"
      },
      {
        id: "full-pushup",
        name: "Full Pushup",
        description: "Standard pushup with chest touching ground. Maintain straight body line throughout.",
        targetReps: 20,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 20 reps"
      },
      {
        id: "close-pushup",
        name: "Close Pushup",
        description: "Pushup with hands close together, emphasizing triceps. Keep elbows close to body.",
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 15 reps"
      },
      {
        id: "uneven-pushup",
        name: "Uneven Pushup",
        description: "One hand on elevated surface (basketball, book). Alternate hands between sets.",
        targetReps: 10,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 10 reps each side"
      },
      {
        id: "half-one-arm-pushup",
        name: "1/2 One Arm Pushup",
        description: "One arm pushup lowering only halfway. Use other arm for minimal support.",
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 8 reps each side"
      },
      {
        id: "lever-pushup",
        name: "Lever Pushup",
        description: "One hand pushup with other hand elevated on basketball. Gradually reduce support.",
        targetReps: 6,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 6 reps each side"
      },
      {
        id: "one-arm-pushup",
        name: "One Arm Pushup",
        description: "Full one arm pushup. The ultimate pushing exercise. Keep body straight and avoid twisting.",
        targetReps: 5,
        targetSets: 3,
        unlockCriteria: "Master the movement"
      }
    ]
  },
  {
    id: "squats",
    name: "Squat Progression",
    category: "Legs", 
    currentLevel: 0,
    exercises: [
      {
        id: "shoulderstand-squat",
        name: "Shoulderstand Squat",
        description: "Lie on back, legs overhead. Perform squatting motion in shoulderstand position.",
        targetReps: 50,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 50 reps"
      },
      {
        id: "jackknife-squat",
        name: "Jackknife Squat", 
        description: "Sit on edge of chair/bed. Lower body while keeping feet off ground, then return to sitting.",
        targetReps: 40,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 40 reps"
      },
      {
        id: "supported-squat",
        name: "Supported Squat",
        description: "Hold onto sturdy object for support while performing full squat motion.",
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 30 reps"
      },
      {
        id: "half-squat",
        name: "Half Squat",
        description: "Squat down only halfway. Focus on proper knee tracking and posture.",
        targetReps: 50,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 50 reps"
      },
      {
        id: "full-squat",
        name: "Full Squat",
        description: "Complete squat with thighs below parallel. Keep chest up and knees tracking over toes.",
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 30 reps"
      },
      {
        id: "close-squat",
        name: "Close Squat",
        description: "Squat with feet close together. Increases difficulty and stability challenge.",
        targetReps: 20,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 20 reps"
      },
      {
        id: "uneven-squat",
        name: "Uneven Squat",
        description: "One foot on basketball or similar object. Alternate legs between sets.",
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 15 reps each side"
      },
      {
        id: "half-one-leg-squat",
        name: "1/2 One Leg Squat",
        description: "Single leg squat (pistol squat) lowering only halfway down.",
        targetReps: 10,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 10 reps each side"
      },
      {
        id: "assisted-one-leg-squat",
        name: "Assisted One Leg Squat",
        description: "Full pistol squat with minimal hand support for balance.",
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 8 reps each side"
      },
      {
        id: "one-leg-squat",
        name: "One Leg Squat",
        description: "Full pistol squat. Ultimate leg strength exercise. Keep supporting leg straight.",
        targetReps: 5,
        targetSets: 3,
        unlockCriteria: "Master the movement"
      }
    ]
  },
  {
    id: "pullups",
    name: "Pull-up Progression",
    category: "Pull",
    currentLevel: 0,
    exercises: [
      {
        id: "vertical-pull",
        name: "Vertical Pull",
        description: "Stand arm's length from wall. Pull body toward wall using pulling motion.",
        targetReps: 50,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 50 reps"
      },
      {
        id: "horizontal-pull",
        name: "Horizontal Pull",
        description: "Lie under low bar/table. Pull chest to bar while keeping body straight.",
        targetReps: 40,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 40 reps"
      },
      {
        id: "jackknife-pull",
        name: "Jackknife Pull",
        description: "Hang from bar with knees bent. Pull up while maintaining bent knee position.",
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 30 reps"
      },
      {
        id: "half-pullup",
        name: "Half Pull-up",
        description: "Pull up only halfway to bar. Focus on controlled movement.",
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 15 reps"
      },
      {
        id: "full-pullup",
        name: "Full Pull-up",
        description: "Complete pull-up with chin over bar. Control both up and down phases.",
        targetReps: 10,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 10 reps"
      },
      {
        id: "close-pullup",
        name: "Close Pull-up",
        description: "Pull-up with hands close together. Emphasizes different muscle activation.",
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 8 reps"
      },
      {
        id: "uneven-pullup",
        name: "Uneven Pull-up",
        description: "One hand higher than other (towel over bar). Alternate hand positions.",
        targetReps: 6,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 6 reps each side"
      },
      {
        id: "half-one-arm-pullup",
        name: "1/2 One Arm Pull-up",
        description: "One arm pull-up pulling only halfway up. Use other arm for minimal support.",
        targetReps: 4,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 4 reps each side"
      },
      {
        id: "assisted-one-arm-pullup",
        name: "Assisted One Arm Pull-up",
        description: "One arm pull-up with towel assistance from other hand.",
        targetReps: 3,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 3 reps each side"
      },
      {
        id: "one-arm-pullup",
        name: "One Arm Pull-up",
        description: "Full one arm pull-up. The ultimate pulling exercise.",
        targetReps: 2,
        targetSets: 3,
        unlockCriteria: "Master the movement"
      }
    ]
  },
  {
    id: "leg-raises",
    name: "Leg Raise Progression",
    category: "Core",
    currentLevel: 0,
    exercises: [
      {
        id: "knee-tuck",
        name: "Knee Tuck",
        description: "Lie on back, bring knees to chest. Focus on controlled movement.",
        targetReps: 40,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 40 reps"
      },
      {
        id: "flat-knee-raise",
        name: "Flat Knee Raise",
        description: "Lie flat, raise knees to 90 degrees. Keep lower back pressed to ground.",
        targetReps: 35,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 35 reps"
      },
      {
        id: "flat-bent-leg-raise",
        name: "Flat Bent Leg Raise",
        description: "Lie flat, raise bent legs until thighs vertical. Control the negative.",
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 30 reps"
      },
      {
        id: "flat-frog-raise",
        name: "Flat Frog Raise",
        description: "Lie flat, knees out to sides, raise legs in 'frog' position.",
        targetReps: 25,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 25 reps"
      },
      {
        id: "flat-straight-leg-raise",
        name: "Flat Straight Leg Raise",
        description: "Lie flat, raise straight legs to vertical. Keep legs straight throughout.",
        targetReps: 20,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 20 reps"
      },
      {
        id: "hanging-knee-raise",
        name: "Hanging Knee Raise",
        description: "Hang from bar, raise knees to chest. Avoid swinging.",
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 15 reps"
      },
      {
        id: "hanging-bent-leg-raise",
        name: "Hanging Bent Leg Raise",
        description: "Hang from bar, raise bent legs until thighs horizontal.",
        targetReps: 12,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 12 reps"
      },
      {
        id: "hanging-frog-raise",
        name: "Hanging Frog Raise",
        description: "Hang from bar, raise legs in frog position as high as possible.",
        targetReps: 10,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 10 reps"
      },
      {
        id: "partial-straight-leg-raise",
        name: "Partial Straight Leg Raise",
        description: "Hang from bar, raise straight legs to horizontal position.",
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 8 reps"
      },
      {
        id: "hanging-straight-leg-raise",
        name: "Hanging Straight Leg Raise",
        description: "Hang from bar, raise straight legs to touch bar. Ultimate core exercise.",
        targetReps: 5,
        targetSets: 3,
        unlockCriteria: "Master the movement"
      }
    ]
  },
  {
    id: "bridges",
    name: "Bridge Progression",
    category: "Core",
    currentLevel: 0,
    exercises: [
      {
        id: "short-bridge",
        name: "Short Bridge",
        description: "Lie on back, knees bent, lift hips up. Hold position briefly.",
        targetReps: 50,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 50 reps"
      },
      {
        id: "straight-bridge",
        name: "Straight Bridge",
        description: "Bridge with legs straight out. Increases difficulty significantly.",
        targetReps: 40,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 40 reps"
      },
      {
        id: "angled-bridge",
        name: "Angled Bridge",
        description: "Bridge with feet elevated on chair or bed. Steeper angle increases difficulty.",
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 30 reps"
      },
      {
        id: "head-bridge",
        name: "Head Bridge",
        description: "Bridge resting on head and feet. Builds neck strength carefully.",
        targetReps: 25,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 25 reps"
      },
      {
        id: "half-bridge",
        name: "Half Bridge",
        description: "Partial back bridge, hands on floor supporting some weight.",
        targetReps: 20,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 20 reps"
      },
      {
        id: "full-bridge",
        name: "Full Bridge",
        description: "Complete back bridge with hands and feet on ground. Classic gymnastics position.",
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 15 reps"
      },
      {
        id: "wall-walking-bridge-down",
        name: "Wall Walking Bridge (Down)",
        description: "Start standing against wall, walk hands down into bridge position.",
        targetReps: 10,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 10 reps"
      },
      {
        id: "wall-walking-bridge-up",
        name: "Wall Walking Bridge (Up)",
        description: "From bridge position, walk hands up wall to standing.",
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 8 reps"
      },
      {
        id: "closing-bridge",
        name: "Closing Bridge", 
        description: "Bridge with hands moving closer to feet. Preparation for stand-to-stand bridge.",
        targetReps: 6,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 6 reps"
      },
      {
        id: "stand-to-stand-bridge",
        name: "Stand-to-Stand Bridge",
        description: "Bridge from standing to standing without wall support. Ultimate back flexibility.",
        targetReps: 3,
        targetSets: 3,
        unlockCriteria: "Master the movement"
      }
    ]
  },
  {
    id: "handstands",
    name: "Handstand Progression",
    category: "Push",
    currentLevel: 0,
    exercises: [
      {
        id: "wall-headstand",
        name: "Wall Headstand",
        description: "Headstand against wall for support. Build up time gradually.",
        targetReps: 120,
        targetSets: 1,
        unlockCriteria: "Work up to 2 minutes"
      },
      {
        id: "crow-stand",
        name: "Crow Stand",
        description: "Balance on hands with knees resting on upper arms. Hold position.",
        targetReps: 60,
        targetSets: 1,
        unlockCriteria: "Work up to 1 minute"
      },
      {
        id: "wall-handstand",
        name: "Wall Handstand",
        description: "Handstand with back against wall for support. Focus on straight line.",
        targetReps: 120,
        targetSets: 1,
        unlockCriteria: "Work up to 2 minutes"
      },
      {
        id: "half-handstand-pushup",
        name: "Half Handstand Pushup",
        description: "Against wall, lower halfway down in handstand. Build strength gradually.",
        targetReps: 20,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 20 reps"
      },
      {
        id: "handstand-pushup",
        name: "Handstand Pushup",
        description: "Full handstand pushup against wall. Head touches ground.",
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 15 reps"
      },
      {
        id: "close-handstand-pushup",
        name: "Close Handstand Pushup",
        description: "Handstand pushup with hands close together. Increases difficulty.",
        targetReps: 12,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 12 reps"
      },
      {
        id: "uneven-handstand-pushup",
        name: "Uneven Handstand Pushup",
        description: "One hand on object (basketball), creating uneven pushup. Alternate hands.",
        targetReps: 10,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 10 reps each side"
      },
      {
        id: "half-one-arm-handstand-pushup",
        name: "1/2 One Arm Handstand Pushup",
        description: "One arm handstand pushup lowering only halfway.",
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 8 reps each side"
      },
      {
        id: "lever-handstand-pushup",
        name: "Lever Handstand Pushup",
        description: "One arm handstand pushup with other hand on basketball for minimal support.",
        targetReps: 6,
        targetSets: 3,
        unlockCriteria: "Work up to 3 sets of 6 reps each side"
      },
      {
        id: "one-arm-handstand-pushup",
        name: "One Arm Handstand Pushup",
        description: "Full one arm handstand pushup. The ultimate bodyweight exercise.",
        targetReps: 5,
        targetSets: 3,
        unlockCriteria: "Master the movement"
      }
    ]
  }
];

// Data management functions
async function saveProgressions() {
    localStorage.setItem(PROGRESSIONS_KEY, JSON.stringify(progressions));
    
    // Also save to GitHub if configured
    if (window.githubStorage && window.githubStorage.isConfigured()) {
        try {
            await window.githubStorage.saveFile('progressions.json', progressions);
        } catch (error) {
            console.error('Failed to save progressions to GitHub:', error);
        }
    }
}

async function loadProgressions() {
    // Try to load from GitHub first
    if (window.githubStorage && window.githubStorage.isConfigured()) {
        try {
            const githubData = await window.githubStorage.loadFile('progressions.json');
            if (githubData) {
                progressions = githubData;
                localStorage.setItem(PROGRESSIONS_KEY, JSON.stringify(progressions));
                return;
            }
        } catch (error) {
            console.error('Failed to load progressions from GitHub:', error);
        }
    }
    
    // Fallback to localStorage
    const saved = localStorage.getItem(PROGRESSIONS_KEY);
    if (saved) {
        try {
            progressions = JSON.parse(saved);
        } catch (error) {
            console.error('Failed to load progressions:', error);
            progressions = [...defaultProgressions];
        }
    } else {
        progressions = [...defaultProgressions];
    }
}

async function saveWorkoutLogs() {
    localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(workoutLogs));
    
    // Also save to GitHub if configured
    if (window.githubStorage && window.githubStorage.isConfigured()) {
        try {
            await window.githubStorage.saveFile('workout-logs.json', workoutLogs);
        } catch (error) {
            console.error('Failed to save workout logs to GitHub:', error);
        }
    }
}

async function loadWorkoutLogs() {
    // Try to load from GitHub first
    if (window.githubStorage && window.githubStorage.isConfigured()) {
        try {
            const githubData = await window.githubStorage.loadFile('workout-logs.json');
            if (githubData) {
                workoutLogs = githubData;
                localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(workoutLogs));
                return;
            }
        } catch (error) {
            console.error('Failed to load workout logs from GitHub:', error);
        }
    }
    
    // Fallback to localStorage
    const saved = localStorage.getItem(WORKOUT_LOGS_KEY);
    if (saved) {
        try {
            workoutLogs = JSON.parse(saved);
        } catch (error) {
            console.error('Failed to load workout logs:', error);
            workoutLogs = [];
        }
    } else {
        workoutLogs = [];
    }
}

// Initialize data
let progressions = [...defaultProgressions];
let workoutLogs = [];

// Initialize GitHub storage when available
async function initializeData() {
    await loadProgressions();
    await loadWorkoutLogs();
}

// Load GitHub storage module
async function loadGitHubStorage() {
    try {
        const module = await import('./src/lib/githubStorage.js');
        window.githubStorage = module.githubStorage;
    } catch (error) {
        console.log('GitHub storage not available, using localStorage only');
    }
}