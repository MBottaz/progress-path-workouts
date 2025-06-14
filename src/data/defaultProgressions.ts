import { Progression } from '@/types/workout';

export const defaultProgressions: Progression[] = [
  {
    id: 'pushup-progression',
    name: 'Pushup Progression',
    category: 'Push',
    currentLevel: 0,
    exercises: [
      {
        id: 'wall-pushup',
        name: 'Wall Pushup',
        description: 'Stand arm\'s length from wall, place palms flat against wall at shoulder height and width. Lean in and push back.',
        targetReps: 50,
        targetSets: 2,
        unlockCriteria: 'Complete 2x50 reps'
      },
      {
        id: 'incline-pushup',
        name: 'Incline Pushup',
        description: 'Hands on elevated surface (bench, chair, bed), body straight. Lower chest to surface and push back up.',
        targetReps: 40,
        targetSets: 2,
        unlockCriteria: 'Complete 2x40 reps'
      },
      {
        id: 'kneeling-pushup',
        name: 'Kneeling Pushup',
        description: 'Knees on ground, hands shoulder-width apart. Lower chest to ground keeping straight line from knees to head.',
        targetReps: 30,
        targetSets: 2,
        unlockCriteria: 'Complete 2x30 reps'
      },
      {
        id: 'half-pushup',
        name: 'Half Pushup',
        description: 'Standard pushup position but only lower halfway down. Focus on control.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'full-pushup',
        name: 'Full Pushup',
        description: 'Standard pushup with chest touching ground. Maintain straight line from head to heels.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'close-pushup',
        name: 'Close Pushup',
        description: 'Hands closer together, emphasizing triceps. Lower chest between hands.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'uneven-pushup',
        name: 'Uneven Pushup',
        description: 'One hand on elevated surface (basketball, book). Alternate hands between sets.',
        targetReps: 20,
        targetSets: 1,
        unlockCriteria: 'Complete 1x20 reps each side'
      },
      {
        id: 'half-one-arm-pushup',
        name: 'Half One-Arm Pushup',
        description: 'One-arm pushup but only lower halfway. Other arm behind back.',
        targetReps: 20,
        targetSets: 1,
        unlockCriteria: 'Complete 1x20 reps each side'
      },
      {
        id: 'lever-pushup',
        name: 'Lever Pushup',
        description: 'One hand on ball or unstable surface, other hand normal. Challenges stability.',
        targetReps: 20,
        targetSets: 1,
        unlockCriteria: 'Complete 1x20 reps each side'
      },
      {
        id: 'one-arm-pushup',
        name: 'One-Arm Pushup',
        description: 'Full one-arm pushup. Feet spread wide for stability, one hand behind back.',
        targetReps: 100,
        targetSets: 1,
        unlockCriteria: 'Master level achieved!'
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
        id: 'shoulderstand-squat',
        name: 'Shoulderstand Squat',
        description: 'Lie on back, legs up. Squat motion in air to build coordination.',
        targetReps: 50,
        targetSets: 2,
        unlockCriteria: 'Complete 2x50 reps'
      },
      {
        id: 'supported-squat',
        name: 'Supported Squat',
        description: 'Hold onto sturdy object for support while squatting. Focus on form.',
        targetReps: 35,
        targetSets: 2,
        unlockCriteria: 'Complete 2x35 reps'
      },
      {
        id: 'half-squat',
        name: 'Half Squat',
        description: 'Squat down only halfway. Feet shoulder-width apart.',
        targetReps: 35,
        targetSets: 2,
        unlockCriteria: 'Complete 2x35 reps'
      },
      {
        id: 'full-squat',
        name: 'Full Squat',
        description: 'Complete squat with thighs parallel to floor or lower.',
        targetReps: 30,
        targetSets: 2,
        unlockCriteria: 'Complete 2x30 reps'
      },
      {
        id: 'close-squat',
        name: 'Close Squat',
        description: 'Feet close together, challenges balance and strength.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'uneven-squat',
        name: 'Uneven Squat',
        description: 'One foot on elevated surface (book, step). Alternate legs between sets.',
        targetReps: 20,
        targetSets: 1,
        unlockCriteria: 'Complete 1x20 reps each leg'
      },
      {
        id: 'half-one-leg-squat',
        name: 'Half One-Leg Squat',
        description: 'Single leg squat but only lower halfway. Other leg extended forward.',
        targetReps: 20,
        targetSets: 1,
        unlockCriteria: 'Complete 1x20 reps each leg'
      },
      {
        id: 'assisted-one-leg-squat',
        name: 'Assisted One-Leg Squat',
        description: 'Single leg squat with light finger support for balance.',
        targetReps: 15,
        targetSets: 1,
        unlockCriteria: 'Complete 1x15 reps each leg'
      },
      {
        id: 'one-leg-squat',
        name: 'One-Leg Squat',
        description: 'Full pistol squat. Lower until hamstring touches calf, other leg extended.',
        targetReps: 50,
        targetSets: 1,
        unlockCriteria: 'Master level achieved!'
      }
    ]
  },
  {
    id: 'pullup-progression',
    name: 'Pullup Progression',
    category: 'Pull',
    currentLevel: 0,
    exercises: [
      {
        id: 'vertical-pull',
        name: 'Vertical Pull',
        description: 'Stand and pull on immovable object (door frame) to build initial strength.',
        targetReps: 40,
        targetSets: 2,
        unlockCriteria: 'Complete 2x40 reps'
      },
      {
        id: 'horizontal-pull',
        name: 'Horizontal Pull',
        description: 'Lie under table/bar, pull chest up to surface. Feet on ground.',
        targetReps: 30,
        targetSets: 2,
        unlockCriteria: 'Complete 2x30 reps'
      },
      {
        id: 'jackknife-pull',
        name: 'Jackknife Pull',
        description: 'Hanging position with knees bent up. Pull up with bent legs.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'half-pullup',
        name: 'Half Pullup',
        description: 'Pullup but only pull halfway up. Focus on control.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'full-pullup',
        name: 'Full Pullup',
        description: 'Complete pullup with chin over bar. Dead hang start.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'close-pullup',
        name: 'Close Pullup',
        description: 'Hands close together, emphasizes biceps and inner lats.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'uneven-pullup',
        name: 'Uneven Pullup',
        description: 'One hand higher than other (towel, different bar heights).',
        targetReps: 12,
        targetSets: 1,
        unlockCriteria: 'Complete 1x12 reps each side'
      },
      {
        id: 'half-one-arm-pullup',
        name: 'Half One-Arm Pullup',
        description: 'One-arm pullup but only pull halfway up.',
        targetReps: 10,
        targetSets: 1,
        unlockCriteria: 'Complete 1x10 reps each arm'
      },
      {
        id: 'assisted-one-arm-pullup',
        name: 'Assisted One-Arm Pullup',
        description: 'One-arm pullup with other hand lightly assisting.',
        targetReps: 8,
        targetSets: 1,
        unlockCriteria: 'Complete 1x8 reps each arm'
      },
      {
        id: 'one-arm-pullup',
        name: 'One-Arm Pullup',
        description: 'Full one-arm pullup. The ultimate pulling exercise.',
        targetReps: 6,
        targetSets: 1,
        unlockCriteria: 'Master level achieved!'
      }
    ]
  },
  {
    id: 'leg-raise-progression',
    name: 'Leg Raise Progression',
    category: 'Core',
    currentLevel: 0,
    exercises: [
      {
        id: 'knee-tuck',
        name: 'Knee Tuck',
        description: 'Sit on edge of chair/bench, pull knees to chest.',
        targetReps: 40,
        targetSets: 2,
        unlockCriteria: 'Complete 2x40 reps'
      },
      {
        id: 'flat-knee-raise',
        name: 'Flat Knee Raise',
        description: 'Lie flat, raise knees to chest. Keep lower back pressed down.',
        targetReps: 35,
        targetSets: 2,
        unlockCriteria: 'Complete 2x35 reps'
      },
      {
        id: 'flat-bent-leg-raise',
        name: 'Flat Bent Leg Raise',
        description: 'Lie flat, raise bent legs until thighs vertical.',
        targetReps: 30,
        targetSets: 2,
        unlockCriteria: 'Complete 2x30 reps'
      },
      {
        id: 'flat-frog-raise',
        name: 'Flat Frog Raise',
        description: 'Lie flat, knees out to sides, raise legs with soles together.',
        targetReps: 25,
        targetSets: 2,
        unlockCriteria: 'Complete 2x25 reps'
      },
      {
        id: 'flat-straight-leg-raise',
        name: 'Flat Straight Leg Raise',
        description: 'Lie flat, raise straight legs to vertical. Control the movement.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'hanging-knee-raise',
        name: 'Hanging Knee Raise',
        description: 'Hang from bar, raise knees to chest. No swinging.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'hanging-bent-leg-raise',
        name: 'Hanging Bent Leg Raise',
        description: 'Hang from bar, raise bent legs until thighs horizontal.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'hanging-frog-raise',
        name: 'Hanging Frog Raise',
        description: 'Hang from bar, knees out to sides, raise with soles together.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'partial-straight-leg-raise',
        name: 'Partial Straight Leg Raise',
        description: 'Hang from bar, raise straight legs halfway up.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'hanging-straight-leg-raise',
        name: 'Hanging Straight Leg Raise',
        description: 'Hang from bar, raise straight legs until horizontal or higher.',
        targetReps: 30,
        targetSets: 2,
        unlockCriteria: 'Master level achieved!'
      }
    ]
  },
  {
    id: 'bridge-progression',
    name: 'Bridge Progression',
    category: 'Bridge',
    currentLevel: 0,
    exercises: [
      {
        id: 'short-bridge',
        name: 'Short Bridge',
        description: 'Lie on back, knees bent, feet flat. Lift hips up creating straight line.',
        targetReps: 50,
        targetSets: 2,
        unlockCriteria: 'Complete 2x50 reps'
      },
      {
        id: 'straight-bridge',
        name: 'Straight Bridge',
        description: 'Legs straight out, lift hips. More challenging than short bridge.',
        targetReps: 40,
        targetSets: 2,
        unlockCriteria: 'Complete 2x40 reps'
      },
      {
        id: 'angled-bridge',
        name: 'Angled Bridge',
        description: 'Feet elevated on chair/bench, perform bridge movement.',
        targetReps: 30,
        targetSets: 2,
        unlockCriteria: 'Complete 2x30 reps'
      },
      {
        id: 'head-bridge',
        name: 'Head Bridge',
        description: 'Top of head on ground, hands supporting. Build neck strength gradually.',
        targetReps: 60,
        targetSets: 2,
        unlockCriteria: 'Hold for 60 seconds total'
      },
      {
        id: 'half-bridge',
        name: 'Half Bridge',
        description: 'Hands and feet on ground, push up halfway. Preparation for full bridge.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'full-bridge',
        name: 'Full Bridge',
        description: 'Complete bridge with hands and feet on ground, body arched.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'wall-walking-bridge-down',
        name: 'Wall Walking Bridge (Down)',
        description: 'Stand facing away from wall, walk hands down wall into bridge.',
        targetReps: 10,
        targetSets: 2,
        unlockCriteria: 'Complete 2x10 reps'
      },
      {
        id: 'wall-walking-bridge-up',
        name: 'Wall Walking Bridge (Up)',
        description: 'From bridge position, walk hands up wall to standing.',
        targetReps: 8,
        targetSets: 2,
        unlockCriteria: 'Complete 2x8 reps'
      },
      {
        id: 'closing-bridge',
        name: 'Closing Bridge',
        description: 'Walk hands closer to feet in bridge position, increasing arch.',
        targetReps: 6,
        targetSets: 2,
        unlockCriteria: 'Complete 2x6 reps'
      },
      {
        id: 'stand-to-stand-bridge',
        name: 'Stand-to-Stand Bridge',
        description: 'From standing, bridge down and back up without wall support.',
        targetReps: 30,
        targetSets: 2,
        unlockCriteria: 'Master level achieved!'
      }
    ]
  },
  {
    id: 'handstand-progression',
    name: 'Handstand Progression',
    category: 'Handstand',
    currentLevel: 0,
    exercises: [
      {
        id: 'wall-headstand',
        name: 'Wall Headstand',
        description: 'Head and forearms on ground against wall, walk feet up wall.',
        targetReps: 120,
        targetSets: 2,
        unlockCriteria: 'Hold for 2 minutes total'
      },
      {
        id: 'crow-stand',
        name: 'Crow Stand',
        description: 'Squat, hands flat on ground, lean forward and lift feet.',
        targetReps: 60,
        targetSets: 2,
        unlockCriteria: 'Hold for 1 minute total'
      },
      {
        id: 'wall-handstand',
        name: 'Wall Handstand',
        description: 'Hands on ground, walk feet up wall until nearly vertical.',
        targetReps: 120,
        targetSets: 2,
        unlockCriteria: 'Hold for 2 minutes total'
      },
      {
        id: 'half-handstand-pushup',
        name: 'Half Handstand Pushup',
        description: 'In wall handstand, lower head halfway to ground and push back up.',
        targetReps: 20,
        targetSets: 2,
        unlockCriteria: 'Complete 2x20 reps'
      },
      {
        id: 'handstand-pushup',
        name: 'Handstand Pushup',
        description: 'Full handstand pushup against wall, head touches ground.',
        targetReps: 15,
        targetSets: 2,
        unlockCriteria: 'Complete 2x15 reps'
      },
      {
        id: 'close-handstand-pushup',
        name: 'Close Handstand Pushup',
        description: 'Handstand pushup with hands close together.',
        targetReps: 12,
        targetSets: 2,
        unlockCriteria: 'Complete 2x12 reps'
      },
      {
        id: 'uneven-handstand-pushup',
        name: 'Uneven Handstand Pushup',
        description: 'One hand on elevated surface during handstand pushup.',
        targetReps: 10,
        targetSets: 1,
        unlockCriteria: 'Complete 1x10 reps each side'
      },
      {
        id: 'half-one-arm-handstand-pushup',
        name: 'Half One-Arm Handstand Pushup',
        description: 'One-arm handstand pushup, lower only halfway.',
        targetReps: 8,
        targetSets: 1,
        unlockCriteria: 'Complete 1x8 reps each arm'
      },
      {
        id: 'lever-handstand-pushup',
        name: 'Lever Handstand Pushup',
        description: 'One hand on ball or unstable surface during handstand pushup.',
        targetReps: 6,
        targetSets: 1,
        unlockCriteria: 'Complete 1x6 reps each side'
      },
      {
        id: 'one-arm-handstand-pushup',
        name: 'One-Arm Handstand Pushup',
        description: 'Full one-arm handstand pushup. The ultimate pressing exercise.',
        targetReps: 5,
        targetSets: 1,
        unlockCriteria: 'Master level achieved!'
      }
    ]
  }
];