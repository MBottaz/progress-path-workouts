export interface Exercise {
  id: string;
  name: string;
  description: string;
  targetReps: number;
  targetSets: number;
  unlockCriteria: string;
}

export interface Progression {
  id: string;
  name: string;
  category: string;
  exercises: Exercise[];
  currentLevel: number;
}

export interface WorkoutEntry {
  id: string;
  date: string;
  progressionId: string;
  exerciseId: string;
  sets: number;
  reps: number[];
  notes?: string;
}

export interface WorkoutData {
  progressions: Progression[];
  entries: WorkoutEntry[];
  lastWorkoutDate?: string;
}