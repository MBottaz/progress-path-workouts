import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progression } from '@/types/workout';
import { Target, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExerciseLevelChangerProps {
  progression: Progression;
  onLevelChange: (progressionId: string, newLevel: number) => void;
  trigger: React.ReactNode;
}

export const ExerciseLevelChanger = ({ progression, onLevelChange, trigger }: ExerciseLevelChangerProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleLevelChange = (newLevel: number) => {
    onLevelChange(progression.id, newLevel);
    setOpen(false);
    toast({
      title: "Level Changed",
      description: `Now at Level ${newLevel + 1}: ${progression.exercises[newLevel].name}`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Change Exercise Level - {progression.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Select which exercise level you want to practice:
          </p>

          {progression.exercises.map((exercise, index) => {
            const isCurrent = index === progression.currentLevel;
            const isCompleted = index < progression.currentLevel;
            
            return (
              <Card 
                key={exercise.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  isCurrent ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleLevelChange(index)}
              >
                <CardContent className="p-4">
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
                        <h4 className="font-semibold text-foreground">
                          Level {index + 1}: {exercise.name}
                        </h4>
                        {isCurrent && <Badge variant="default">Current</Badge>}
                        {isCompleted && <Badge variant="secondary">Completed</Badge>}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {exercise.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-primary">
                          Target: {exercise.targetSets} sets × {exercise.targetReps} reps
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};