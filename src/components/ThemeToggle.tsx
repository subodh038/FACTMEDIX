
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Type } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, isLargeText, toggleDarkMode, toggleLargeText } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="rounded-full transition-all duration-300 hover:bg-muted focus-ring hover-glow"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-400 glow-icon" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700" />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleLargeText}
        className="rounded-full transition-all duration-300 hover:bg-muted focus-ring hover-glow"
        aria-label={isLargeText ? "Use normal text size" : "Use larger text size"}
      >
        <Type className={`h-5 w-5 ${isLargeText ? 'text-factmedix-primary glow-icon' : ''}`} />
      </Button>
    </div>
  );
};
