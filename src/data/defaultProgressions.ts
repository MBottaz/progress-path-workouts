import { Progression } from '@/types/workout';

export const defaultProgressions: Progression[] = [
  {
    id: 'push-up-progression',
    name: 'Push-up Progression',
    category: 'Push',
    currentLevel: 0,
    exercises: [
      {
        id: 'wall-pushup',
        name: 'Wall Push-up',
        description: 'Stand arm\'s length from wall, hands flat against wall at shoulder height',
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 15 reps'
      },
      {
        id: 'incline-pushup',
        name: 'Incline Push-up',
        description: 'Hands on elevated surface (bench, chair), body straight',
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 15 reps'
      },
      {
        id: 'knee-pushup',
        name: 'Knee Push-up',
        description: 'Standard push-up position but on knees',
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 15 reps'
      },
      {
        id: 'regular-pushup',
        name: 'Regular Push-up',
        description: 'Standard push-up with straight body line',
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 15 reps'
      },
      {
        id: 'diamond-pushup',
        name: 'Diamond Push-up',
        description: 'Hands form diamond shape, focuses on triceps',
        targetReps: 12,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 12 reps'
      }
    ]
  },
  {
    id: 'squat-progression',
    name: 'Squat Progression',
    category: 'Legs',
    currentLevel: 0,
    exercises: [
      {
        id: 'assisted-squat',
        name: 'Assisted Squat',
        description: 'Hold onto sturdy object for support while squatting',
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 15 reps'
      },
      {
        id: 'regular-squat',
        name: 'Regular Squat',
        description: 'Feet shoulder-width apart, squat down until thighs parallel to floor',
        targetReps: 20,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 20 reps'
      },
      {
        id: 'jump-squat',
        name: 'Jump Squat',
        description: 'Regular squat with explosive jump at the top',
        targetReps: 15,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 15 reps'
      },
      {
        id: 'pistol-squat-progression',
        name: 'Pistol Squat (Assisted)',
        description: 'Single-leg squat with assistance, work toward full pistol squat',
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 8 reps each leg'
      }
    ]
  },
  {
    id: 'pull-up-progression',
    name: 'Pull-up Progression',
    category: 'Pull',
    currentLevel: 0,
    exercises: [
      {
        id: 'dead-hang',
        name: 'Dead Hang',
        description: 'Hang from pull-up bar, build grip strength',
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: 'Hold for 30 seconds, 3 sets'
      },
      {
        id: 'negative-pullup',
        name: 'Negative Pull-up',
        description: 'Jump to top position, slowly lower yourself down',
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 8 slow negatives'
      },
      {
        id: 'assisted-pullup',
        name: 'Assisted Pull-up',
        description: 'Use resistance band or partner assistance',
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 8 reps'
      },
      {
        id: 'regular-pullup',
        name: 'Regular Pull-up',
        description: 'Full pull-up from dead hang to chin over bar',
        targetReps: 8,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 8 reps'
      },
      {
        id: 'weighted-pullup',
        name: 'Weighted Pull-up',
        description: 'Regular pull-up with additional weight',
        targetReps: 5,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 5 reps'
      }
    ]
  },
  {
    id: 'plank-progression',
    name: 'Plank Progression',
    category: 'Core',
    currentLevel: 0,
    exercises: [
      {
        id: 'knee-plank',
        name: 'Knee Plank',
        description: 'Plank position on knees instead of toes',
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: 'Hold for 30 seconds, 3 sets'
      },
      {
        id: 'regular-plank',
        name: 'Regular Plank',
        description: 'Standard plank on toes, straight body line',
        targetReps: 60,
        targetSets: 3,
        unlockCriteria: 'Hold for 60 seconds, 3 sets'
      },
      {
        id: 'single-arm-plank',
        name: 'Single Arm Plank',
        description: 'Plank with one arm extended forward',
        targetReps: 30,
        targetSets: 3,
        unlockCriteria: 'Hold for 30 seconds each arm, 3 sets'
      },
      {
        id: 'plank-to-pushup',
        name: 'Plank to Push-up',
        description: 'Transition from plank to push-up position and back',
        targetReps: 10,
        targetSets: 3,
        unlockCriteria: 'Complete 3 sets of 10 transitions'
      }
    ]
  }
];