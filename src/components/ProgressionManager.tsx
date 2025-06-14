import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WorkoutData, Progression } from '@/types/workout';
import { RotateCcw, CheckCircle, Lock, Target, Plus, Edit, Trash2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProgressionEditor } from './ProgressionEditor';
import { ExerciseLevelChanger } from './ExerciseLevelChanger';

interface ProgressionManagerProps {
  workoutData: WorkoutData;
  onResetProgression: (progressionId: string) => void;
  onChangeExerciseLevel: (progressionId: string, newLevel: number) => void;
  onAddProgression: (progression: Progression) => void;
  onUpdateProgression: (progression: Progression) => void;
  onDeleteProgression: (progressionId: string) => void;
}

export const ProgressionManager = ({ 
  workoutData, 
  onResetProgression, 
  onChangeExerciseLevel,
  onAddProgression,
  onUpdateProgression,
  onDeleteProgression 
}: ProgressionManagerProps) => {
  const { toast } = useToast();

  const handleReset = (progressionId: string, progressionName: string) => {
    onResetProgression(progressionId);
    toast({
      title: "Progression Reset",
      description: `${progressionName} has been reset to level 1.`
    });
  };

  const handleDelete = (progressionId: string, progressionName: string) => {
    if (confirm(`Are you sure you want to delete "${progressionName}"? This will also delete all related workout entries.`)) {
      onDeleteProgression(progressionId);
      toast({
        title: "Progression Deleted",
        description: `${progressionName} has been deleted.`
      });
    }
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
          <h2 className="text-2xl font-bold text-foreground">Manage Progressions</h2>
          <p className="text-muted-foreground">View all exercises in each progression and manage your progress</p>
        </div>
        <ProgressionEditor
          onSave={onAddProgression}
          trigger={
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Progression
            </Button>
          }
        />
      </div>

      <div className="space-y-6">
        {workoutData.progressions.map((progression) => {
          const progressPercentage = ((progression.currentLevel + 1) / progression.exercises.length) * 100;
          
          return (
            <Card key={progression.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle>{progression.name}</CardTitle>
                      <Badge className={getCategoryColor(progression.category)}>
                        {progression.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={progressPercentage} className="w-32" />
                      <span className="text-sm text-muted-foreground">
                        Level {progression.currentLevel + 1} of {progression.exercises.length}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <ExerciseLevelChanger
                      progression={progression}
                      onLevelChange={onChangeExerciseLevel}
                      trigger={
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Change Level
                        </Button>
                      }
                    />
                    <ProgressionEditor
                      progression={progression}
                      onSave={onUpdateProgression}
                      trigger={
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      }
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReset(progression.id, progression.name)}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(progression.id, progression.name)}
                      className="flex items-center gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {progression.exercises.map((exercise, index) => {
                    const isCurrent = index === progression.currentLevel;
                    const isUnlocked = index <= progression.currentLevel;
                    const isCompleted = index < progression.currentLevel;
                    
                    return (
                      <div
                        key={exercise.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          isCurrent 
                            ? 'border-primary bg-primary/5' 
                            : isUnlocked 
                              ? 'border-border bg-background' 
                              : 'border-muted bg-muted/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : isCurrent ? (
                              <Target className="w-5 h-5 text-primary" />
                            ) : (
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-semibold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                                Level {index + 1}: {exercise.name}
                              </h4>
                              {isCurrent && <Badge variant="default">Current</Badge>}
                              {isCompleted && <Badge variant="secondary">Completed</Badge>}
                            </div>
                            
                            <p className={`text-sm mb-2 ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                              {exercise.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <span className={`font-medium ${isUnlocked ? 'text-primary' : 'text-muted-foreground/60'}`}>
                                Target: {exercise.targetSets} sets × {exercise.targetReps} reps
                              </span>
                              {!isCompleted && (
                                <span className={`text-xs ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                                  {exercise.unlockCriteria}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};