import { Button } from '@/components/ui/button';
import { Home, Calendar, TrendingUp, Settings } from 'lucide-react';

interface NavigationProps {
  activeView: 'dashboard' | 'logger' | 'progressions' | 'stats';
  onViewChange: (view: 'dashboard' | 'logger' | 'progressions' | 'stats') => void;
}

export const Navigation = ({ activeView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'logger', label: 'Log Workout', icon: Calendar },
    { id: 'stats', label: 'Statistics', icon: TrendingUp },
    { id: 'progressions', label: 'Progressions', icon: Settings }
  ] as const;

  return (
    <nav className="flex justify-center">
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        {navItems.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeView === id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(id)}
            className="flex items-center gap-2"
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};