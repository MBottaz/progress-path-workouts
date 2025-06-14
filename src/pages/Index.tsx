import { useState, useEffect } from 'react';
import { WorkoutDashboard } from '@/components/WorkoutDashboard';
import { WorkoutLogger } from '@/components/WorkoutLogger';
import { ProgressionManager } from '@/components/ProgressionManager';
import { StatsView } from '@/components/StatsView';
import { Navigation } from '@/components/Navigation';
import { useWorkoutData } from '@/hooks/useWorkoutData';

const Index = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'logger' | 'progressions' | 'stats'>('dashboard');
  const { 
    workoutData, 
    addWorkoutEntry, 
    resetProgression, 
    changeExerciseLevel,
    addProgression,
    updateProgression,
    deleteProgression,
    getProgressionStats 
  } = useWorkoutData();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <WorkoutDashboard workoutData={workoutData} onStartWorkout={() => setActiveView('logger')} />;
      case 'logger':
        return <WorkoutLogger workoutData={workoutData} onLogEntry={addWorkoutEntry} onComplete={() => setActiveView('dashboard')} />;
      case 'progressions':
        return (
          <ProgressionManager 
            workoutData={workoutData} 
            onResetProgression={resetProgression}
            onChangeExerciseLevel={changeExerciseLevel}
            onAddProgression={addProgression}
            onUpdateProgression={updateProgression}
            onDeleteProgression={deleteProgression}
          />
        );
      case 'stats':
        return <StatsView workoutData={workoutData} getProgressionStats={getProgressionStats} />;
      default:
        return <WorkoutDashboard workoutData={workoutData} onStartWorkout={() => setActiveView('logger')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Workout Progression Tracker</h1>
          <p className="text-muted-foreground">Build strength through progressive bodyweight training</p>
        </header>
        
        <Navigation activeView={activeView} onViewChange={setActiveView} />
        
        <main className="mt-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default Index;