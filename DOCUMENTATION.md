# Workout Progression Tracker Documentation

## Overview
A static React-based workout progression tracker that helps users build strength through progressive bodyweight training. The app uses a progression system where users advance through increasingly difficult exercises based on performance criteria.

## Project Structure

### Core Files
```
src/
├── pages/
│   ├── Index.tsx           # Main application page with navigation
│   └── NotFound.tsx        # 404 error page
├── components/
│   ├── Navigation.tsx      # Main navigation component
│   ├── WorkoutDashboard.tsx # Dashboard showing current progressions
│   ├── WorkoutLogger.tsx   # Workout logging interface
│   ├── ProgressionManager.tsx # Manage custom progressions
│   ├── ProgressionEditor.tsx # Create/edit progression dialog
│   ├── ExerciseLevelChanger.tsx # Change exercise level dialog
│   ├── StatsView.tsx       # Progress statistics and charts
│   └── ui/                 # Shadcn UI components
├── hooks/
│   └── useWorkoutData.ts   # Main data management hook
├── types/
│   └── workout.ts          # TypeScript type definitions
├── data/
│   └── defaultProgressions.ts # Default bodyweight progressions
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main app component with routing
└── main.tsx              # Application entry point
```

## Data Structure

### Types (src/types/workout.ts)
- **Exercise**: Individual exercise with name, description, targets, and unlock criteria
- **Progression**: Series of exercises with progression logic
- **WorkoutEntry**: Individual workout log entry
- **WorkoutData**: Complete application state

### Default Progressions (src/data/defaultProgressions.ts)
Pre-built bodyweight strength foundation including:
- Push-ups (Wall → Incline → Regular → Diamond)
- Pull-ups (Dead Hang → Negatives → Assisted → Full)
- Squats (Chair → Bodyweight → Pistol progression)
- Core exercises (Plank → Hollow Body → Advanced)

## Key Features

### 1. Progression System
- Each progression contains multiple exercise levels
- Automatic advancement when criteria are met
- Manual level changes available
- Visual progress indicators

### 2. Workout Logging
- Select progression to work on
- Log sets and repetitions
- Add optional notes
- Automatic progression checking

### 3. Data Persistence
- All data stored in localStorage
- Automatic save on every change
- Survives browser refreshes and visits

### 4. Progression Management
- Create custom progressions
- Edit existing progressions
- Delete progressions (with confirmation)
- Change exercise levels manually

### 5. Statistics & Analytics
- Progress charts using Recharts
- Workout history tracking
- Performance metrics
- Progression completion percentages

## Component Architecture

### Main Hook: useWorkoutData
Central data management with functions for:
- `addWorkoutEntry()` - Log new workout
- `addProgression()` - Create custom progression
- `updateProgression()` - Edit existing progression
- `deleteProgression()` - Remove progression
- `resetProgression()` - Reset to level 1
- `changeExerciseLevel()` - Manual level change
- `getProgressionStats()` - Analytics data

### Navigation Flow
1. **Dashboard** - Overview of current progressions
2. **Logger** - Log workout sessions
3. **Progressions** - Manage custom progressions
4. **Stats** - View progress analytics

## User Workflow

### Starting a Workout
1. Navigate to "Log Workout"
2. Select progression to work on
3. View current exercise details
4. Log sets and repetitions
5. Add optional notes
6. Submit workout

### Progression Advancement
- System automatically checks if criteria are met
- If yes: unlock next exercise level
- Toast notification confirms advancement
- Next workout shows new exercise

### Creating Custom Progressions
1. Go to "Manage Progressions"
2. Click "Add New Progression"
3. Fill in progression details
4. Add exercises with targets
5. Save progression

## Technical Implementation

### State Management
- React hooks for local state
- Custom hook for data persistence
- localStorage for data storage
- Automatic serialization/deserialization

### UI Components
- Shadcn UI component library
- Tailwind CSS for styling
- Responsive design for mobile/desktop
- Toast notifications for feedback

### Data Flow
1. User actions trigger hook functions
2. Hook updates local state
3. useEffect saves to localStorage
4. UI re-renders with new data

## Deployment

### GitHub Pages Compatible
- Static React build
- No server-side requirements
- Client-side routing with fallback
- All data stored locally

### Build Process
```bash
npm run build
# Generates static files in dist/
# Upload dist/ contents to GitHub Pages
```

## Customization

### Adding New Progressions
1. Edit `src/data/defaultProgressions.ts`
2. Follow existing structure
3. Include proper exercise progression

### Styling Changes
- Modify Tailwind classes in components
- Update `src/index.css` for global styles
- Use semantic color tokens from design system

### Adding Features
- Create new components in `src/components/`
- Add navigation items in `Navigation.tsx`
- Extend types in `src/types/workout.ts`

## Browser Compatibility
- Modern browsers with localStorage support
- Responsive design for mobile/tablet/desktop
- Progressive enhancement approach

## Data Export/Import
Currently stores data in localStorage. For backup:
1. Open browser dev tools
2. Go to Application/Storage tab
3. Export localStorage data
4. Import by setting localStorage values

## Future Enhancements
- Export/import functionality
- Workout templates
- Rest timer integration
- Progress photos
- Social sharing features