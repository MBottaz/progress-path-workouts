import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WorkoutData } from '@/types/workout';
import { ChevronRight, Play, Target, Trophy } from 'lucide-react';

interface WorkoutDashboardProps {
  workoutData: WorkoutData;
  onStartWorkout: () => void;
}

export const WorkoutDashboard = ({ workoutData, onStartWorkout }: WorkoutDashboardProps) => {
  const getProgressionStatus = (progression: any) => {
    const currentExercise = progression.exercises[progression.currentLevel];
    const nextExercise = progression.exercises[progression.currentLevel + 1];
    const progressPercentage = ((progression.currentLevel + 1) / progression.exercises.length) * 100;
    
    return {
      currentExercise,
      nextExercise,
      progressPercentage,
      isCompleted: progression.currentLevel === progression.exercises.length - 1
    };
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Push': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Pull': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Legs': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Core': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Training Progress</h2>
          <p className="text-muted-foreground">
            {workoutData.lastWorkoutDate 
              ? `Last workout: ${new Date(workoutData.lastWorkoutDate).toLocaleDateString()}`
              : 'Ready to start your first workout?'
            }
          </p>
        </div>
        <Button onClick={onStartWorkout} size="lg" className="flex items-center gap-2">
          <Play className="w-5 h-5" />
          Start Workout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {workoutData.progressions.map((progression) => {
          const status = getProgressionStatus(progression);
          
          return (
            <Card key={progression.id} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{progression.name}</CardTitle>
                  <Badge className={getCategoryColor(progression.category)}>
                    {progression.category}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Progress value={status.progressPercentage} className="flex-1" />
                  <span className="text-sm font-medium">
                    Level {progression.currentLevel + 1}/{progression.exercises.length}
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="font-medium">Current Exercise</span>
                  </div>
                  <div className="pl-6">
                    <h4 className="font-semibold text-foreground">{status.currentExercise.name}</h4>
                    <p className="text-sm text-muted-foreground">{status.currentExercise.description}</p>
                    <p className="text-sm font-medium text-primary">
                      Target: {status.currentExercise.targetSets} sets × {status.currentExercise.targetReps} reps
                    </p>
                  </div>
                </div>

                {status.nextExercise && !status.isCompleted && (
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-muted-foreground">Next Exercise</span>
                    </div>
                    <div className="pl-6">
                      <h4 className="font-semibold text-muted-foreground">{status.nextExercise.name}</h4>
                      <p className="text-sm text-muted-foreground">{status.currentExercise.unlockCriteria}</p>
                    </div>
                  </div>
                )}

                {status.isCompleted && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 border-t pt-4">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">Progression Completed!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};