import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WorkoutData } from '@/types/workout';
import { Calendar, TrendingUp, Target, Trophy, Activity } from 'lucide-react';

interface StatsViewProps {
  workoutData: WorkoutData;
  getProgressionStats: (progressionId: string) => any;
}

export const StatsView = ({ workoutData, getProgressionStats }: StatsViewProps) => {
  const totalWorkouts = workoutData.entries.length;
  const uniqueWorkoutDays = new Set(
    workoutData.entries.map(entry => entry.date.split('T')[0])
  ).size;
  
  const getRecentWorkouts = () => {
    return workoutData.entries
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  };

  const getWorkoutStreak = () => {
    const sortedDates = Array.from(new Set(
      workoutData.entries.map(entry => entry.date.split('T')[0])
    )).sort().reverse();
    
    if (sortedDates.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    let currentDate = new Date(sortedDates[0]);
    
    // Check if the most recent workout was today or yesterday
    const daysDiff = Math.floor((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 1) return 0;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i]);
      const daysDifference = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDifference === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    
    return streak;
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

  const recentWorkouts = getRecentWorkouts();
  const workoutStreak = getWorkoutStreak();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Workout Statistics</h2>
        <p className="text-muted-foreground">Track your progress and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workout Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueWorkoutDays}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workoutStreak}</div>
            <p className="text-xs text-muted-foreground">days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progressions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workoutData.progressions.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Progression Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Progression Overview</CardTitle>
          <CardDescription>Your progress in each exercise category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workoutData.progressions.map((progression) => {
              const stats = getProgressionStats(progression.id);
              if (!stats) return null;
              
              return (
                <div key={progression.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{progression.name}</span>
                      <Badge className={getCategoryColor(progression.category)}>
                        {progression.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      Level {stats.currentLevel + 1}/{stats.totalLevels}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Progress value={stats.progressPercentage} className="flex-1" />
                    <span className="text-sm font-medium min-w-0">
                      {Math.round(stats.progressPercentage)}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {stats.totalWorkouts} workouts completed
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {recentWorkouts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your last 10 workout sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkouts.map((entry) => {
                const progression = workoutData.progressions.find(p => p.id === entry.progressionId);
                const exercise = progression?.exercises.find(e => e.id === entry.exerciseId);
                
                return (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{exercise?.name}</span>
                        {progression && (
                          <Badge className={getCategoryColor(progression.category)} variant="outline">
                            {progression.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.sets} sets × {entry.reps.join(', ')} reps
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};