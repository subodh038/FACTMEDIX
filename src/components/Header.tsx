
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { History, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-factmedix-dark/70 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-factmedix-primary to-factmedix-light flex items-center justify-center glow-effect">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white dark:bg-factmedix-dark flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>
          <span className="font-bold text-lg text-factmedix-primary glow-text">FactMedix</span>
        </Link>
        
        <nav className="flex items-center gap-3">
          <ThemeToggle />
          
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-factmedix-primary hover:text-foreground focus-ring hover-glow"
                onClick={() => navigate('/history')}
              >
                <History className="mr-1 h-4 w-4" />
                History
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover-glow rounded-full" aria-label="User menu">
                    <div className="h-8 w-8 rounded-full bg-factmedix-secondary/20 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>My Account</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/history')}>
                    <History className="mr-2 h-4 w-4" />
                    <span>My History</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="text-factmedix-primary border-factmedix-primary/30 hover:bg-factmedix-primary/10 focus-ring hover-glow"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="mr-1 h-4 w-4" />
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
