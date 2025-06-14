import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progression, Exercise } from '@/types/workout';
import { Plus, Trash2, Edit, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProgressionEditorProps {
  progression?: Progression;
  onSave: (progression: Progression) => void;
  trigger: React.ReactNode;
}

export const ProgressionEditor = ({ progression, onSave, trigger }: ProgressionEditorProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Progression>(() => progression || {
    id: Date.now().toString(),
    name: '',
    category: 'Push',
    currentLevel: 0,
    exercises: []
  });
  const { toast } = useToast();

  const categories = ['Push', 'Pull', 'Legs', 'Core'];

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      description: '',
      targetReps: 10,
      targetSets: 3,
      unlockCriteria: 'Complete target sets and reps'
    };
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) => 
        i === index ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  const removeExercise = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const moveExercise = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= formData.exercises.length) return;
    
    setFormData(prev => {
      const newExercises = [...prev.exercises];
      const [moved] = newExercises.splice(fromIndex, 1);
      newExercises.splice(toIndex, 0, moved);
      return { ...prev, exercises: newExercises };
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Progression name is required",
        variant: "destructive"
      });
      return;
    }

    if (formData.exercises.length === 0) {
      toast({
        title: "Error", 
        description: "At least one exercise is required",
        variant: "destructive"
      });
      return;
    }

    const hasEmptyExercises = formData.exercises.some(ex => !ex.name.trim() || !ex.description.trim());
    if (hasEmptyExercises) {
      toast({
        title: "Error",
        description: "All exercises must have a name and description",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    setOpen(false);
    toast({
      title: "Success",
      description: `Progression ${progression ? 'updated' : 'created'} successfully`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {progression ? 'Edit Progression' : 'Create New Progression'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Progression Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Push-up Progression"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Exercises</h3>
              <Button onClick={addExercise} size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Exercise
              </Button>
            </div>

            {formData.exercises.map((exercise, index) => (
              <Card key={exercise.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      <Badge variant="outline">Level {index + 1}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveExercise(index, index - 1)}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveExercise(index, index + 1)}
                        disabled={index === formData.exercises.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeExercise(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Exercise Name</Label>
                      <Input
                        value={exercise.name}
                        onChange={(e) => updateExercise(index, 'name', e.target.value)}
                        placeholder="e.g., Wall Push-up"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unlock Criteria</Label>
                      <Input
                        value={exercise.unlockCriteria}
                        onChange={(e) => updateExercise(index, 'unlockCriteria', e.target.value)}
                        placeholder="e.g., Complete 3 sets of 15 reps"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exercise.description}
                      onChange={(e) => updateExercise(index, 'description', e.target.value)}
                      placeholder="Describe how to perform this exercise"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Sets</Label>
                      <Input
                        type="number"
                        min="1"
                        value={exercise.targetSets}
                        onChange={(e) => updateExercise(index, 'targetSets', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Reps</Label>
                      <Input
                        type="number"
                        min="1"
                        value={exercise.targetReps}
                        onChange={(e) => updateExercise(index, 'targetReps', parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {progression ? 'Update' : 'Create'} Progression
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};