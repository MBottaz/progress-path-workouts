import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { WorkoutData, WorkoutEntry } from '@/types/workout';
import { Plus, Minus, CheckCircle, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkoutLoggerProps {
  workoutData: WorkoutData;
  onLogEntry: (entry: Omit<WorkoutEntry, 'id'>) => void;
  onComplete: () => void;
}

interface SetData {
  reps: number;
}

export const WorkoutLogger = ({ workoutData, onLogEntry, onComplete }: WorkoutLoggerProps) => {
  const [selectedProgression, setSelectedProgression] = useState<string>('');
  const [sets, setSets] = useState<SetData[]>([{ reps: 0 }]);
  const [notes, setNotes] = useState('');
  const [currentWorkoutId] = useState<string>(() => Date.now().toString());
  const { toast } = useToast();

  const selectedProgressionData = workoutData.progressions.find(p => p.id === selectedProgression);
  const currentExercise = selectedProgressionData?.exercises[selectedProgressionData.currentLevel];

  const addSet = () => {
    setSets([...sets, { reps: 0 }]);
  };

  const removeSet = (index: number) => {
    if (sets.length > 1) {
      setSets(sets.filter((_, i) => i !== index));
    }
  };

  const updateSetReps = (index: number, reps: number) => {
    setSets(sets.map((set, i) => i === index ? { ...set, reps: Math.max(0, reps) } : set));
  };

  const handleLogWorkout = () => {
    if (!selectedProgression || !currentExercise) {
      toast({
        title: "Error",
        description: "Please select a progression first.",
        variant: "destructive"
      });
      return;
    }

    const validSets = sets.filter(set => set.reps > 0);
    if (validSets.length === 0) {
      toast({
        title: "Error", 
        description: "Please log at least one set with reps.",
        variant: "destructive"
      });
      return;
    }

    const entry: Omit<WorkoutEntry, 'id'> = {
      date: new Date().toISOString(),
      workoutId: currentWorkoutId,
      progressionId: selectedProgression,
      exerciseId: currentExercise.id,
      sets: validSets.length,
      reps: validSets.map(set => set.reps),
      notes: notes.trim() || undefined
    };

    onLogEntry(entry);

    // Check if progression criteria was met
    const targetMet = validSets.length >= currentExercise.targetSets && 
                     validSets.every(set => set.reps >= currentExercise.targetReps);

    if (targetMet) {
      toast({
        title: "Progression Unlocked!",
        description: `Great job! You've unlocked the next level in ${selectedProgressionData?.name}.`,
      });
    } else {
      toast({
        title: "Workout Logged",
        description: "Keep pushing to unlock the next progression!",
      });
    }

    // Keep progression selected, reset only sets and notes
    setSets([{ reps: 0 }]);
    setNotes('');
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
          <h2 className="text-2xl font-bold text-foreground">Log Your Workout</h2>
          <p className="text-muted-foreground">Track your progress and unlock new exercises</p>
        </div>
        <Button variant="outline" onClick={onComplete}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Progression Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Exercise</h3>
          <div className="grid gap-3">
            {workoutData.progressions.map((progression) => {
              const currentExercise = progression.exercises[progression.currentLevel];
              const isSelected = selectedProgression === progression.id;
              
              return (
                <Card 
                  key={progression.id}
                  className={`cursor-pointer transition-colors ${isSelected ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedProgression(progression.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{progression.name}</CardTitle>
                      <Badge className={getCategoryColor(progression.category)}>
                        {progression.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{currentExercise.name}</p>
                      <p className="text-xs text-muted-foreground">{currentExercise.description}</p>
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <Target className="w-3 h-3" />
                        {currentExercise.targetSets} sets × {currentExercise.targetReps} reps
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Workout Logging */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Log Sets & Reps</h3>
            {selectedProgression && (
              <div className="text-sm text-muted-foreground">
                Workout ID: {currentWorkoutId.slice(-6)}
              </div>
            )}
          </div>
          
          {/* Workout History for Selected Progression */}
          {selectedProgression && (
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {workoutData.entries
                  .filter(entry => entry.progressionId === selectedProgression)
                  .slice(-3)
                  .reverse()
                  .map((entry, index) => {
                    const exercise = selectedProgressionData?.exercises.find(ex => ex.id === entry.exerciseId);
                    return (
                      <div key={entry.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                        <div>
                          <span className="font-medium">{exercise?.name}</span>
                          <span className="text-muted-foreground ml-2">
                            {entry.sets} sets × {entry.reps.join(', ')} reps
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                    );
                  })}
                {workoutData.entries.filter(entry => entry.progressionId === selectedProgression).length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-2">
                    No previous workouts for this progression
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {selectedProgressionData && currentExercise ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{currentExercise.name}</CardTitle>
                <CardDescription>{currentExercise.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Sets</Label>
                    <Button variant="outline" size="sm" onClick={addSet}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {sets.map((set, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Label className="w-12">Set {index + 1}</Label>
                      <Input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSetReps(index, parseInt(e.target.value) || 0)}
                        placeholder="Reps"
                        min="0"
                        className="flex-1"
                      />
                      {sets.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSet(index)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How did the exercise feel? Any observations..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleLogWorkout} className="w-full" size="lg">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Log Workout
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select an exercise to start logging your workout</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};