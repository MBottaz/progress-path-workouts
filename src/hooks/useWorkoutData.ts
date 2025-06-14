import { useState, useEffect } from 'react';
import { WorkoutData, WorkoutEntry, Progression } from '@/types/workout';
import { defaultProgressions } from '@/data/defaultProgressions';

const STORAGE_KEY = 'workout-progression-data';

export const useWorkoutData = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    progressions: defaultProgressions,
    entries: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setWorkoutData(parsed);
      } catch (error) {
        console.error('Failed to parse saved workout data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever workoutData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutData));
  }, [workoutData]);

  const addWorkoutEntry = (entry: Omit<WorkoutEntry, 'id'>) => {
    const newEntry: WorkoutEntry = {
      ...entry,
      id: Date.now().toString()
    };

    setWorkoutData(prev => {
      const updatedData = {
        ...prev,
        entries: [...prev.entries, newEntry],
        lastWorkoutDate: new Date().toISOString()
      };

      // Check if progression criteria is met
      const progression = prev.progressions.find(p => p.id === entry.progressionId);
      if (progression) {
        const currentExercise = progression.exercises[progression.currentLevel];
        if (currentExercise && checkProgressionCriteria(entry, currentExercise)) {
          updatedData.progressions = prev.progressions.map(p => 
            p.id === entry.progressionId 
              ? { ...p, currentLevel: Math.min(p.currentLevel + 1, p.exercises.length - 1) }
              : p
          );
        }
      }

      return updatedData;
    });
  };

  const checkProgressionCriteria = (entry: Omit<WorkoutEntry, 'id'>, exercise: any): boolean => {
    // Simple criteria check: completed target sets with target reps
    const targetMet = entry.sets >= exercise.targetSets && 
                     entry.reps.every(rep => rep >= exercise.targetReps);
    return targetMet;
  };

  const resetProgression = (progressionId: string) => {
    setWorkoutData(prev => ({
      ...prev,
      progressions: prev.progressions.map(p => 
        p.id === progressionId ? { ...p, currentLevel: 0 } : p
      )
    }));
  };

  const changeExerciseLevel = (progressionId: string, newLevel: number) => {
    setWorkoutData(prev => ({
      ...prev,
      progressions: prev.progressions.map(p => 
        p.id === progressionId ? { ...p, currentLevel: newLevel } : p
      )
    }));
  };

  const addProgression = (progression: Progression) => {
    setWorkoutData(prev => ({
      ...prev,
      progressions: [...prev.progressions, progression]
    }));
  };

  const updateProgression = (updatedProgression: Progression) => {
    setWorkoutData(prev => ({
      ...prev,
      progressions: prev.progressions.map(p => 
        p.id === updatedProgression.id ? updatedProgression : p
      )
    }));
  };

  const deleteProgression = (progressionId: string) => {
    setWorkoutData(prev => ({
      ...prev,
      progressions: prev.progressions.filter(p => p.id !== progressionId),
      entries: prev.entries.filter(e => e.progressionId !== progressionId)
    }));
  };

  const getProgressionStats = (progressionId: string) => {
    const entries = workoutData.entries.filter(e => e.progressionId === progressionId);
    const progression = workoutData.progressions.find(p => p.id === progressionId);
    
    if (!progression) return null;

    return {
      totalWorkouts: entries.length,
      currentLevel: progression.currentLevel,
      totalLevels: progression.exercises.length,
      recentEntries: entries.slice(-10),
      progressPercentage: ((progression.currentLevel + 1) / progression.exercises.length) * 100
    };
  };

  return {
    workoutData,
    addWorkoutEntry,
    resetProgression,
    changeExerciseLevel,
    addProgression,
    updateProgression,
    deleteProgression,
    getProgressionStats
  };
};