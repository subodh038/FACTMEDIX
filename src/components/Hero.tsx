
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface HeroProps {
  onAnalyze: (claimText: string) => void;
  isAnalyzing: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyze, isAnalyzing }) => {
  const [claimText, setClaimText] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!claimText.trim()) {
      toast({
        title: "Empty claim",
        description: "Please paste a health claim to analyze",
        variant: "destructive"
      });
      return;
    }
    
    onAnalyze(claimText);
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-factmedix-primary to-factmedix-secondary bg-clip-text text-transparent glow-text-strong">
          Instantly Verify Health Claims
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered panel to check if medical advice is trustworthy
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="glass-card p-8 transition-all hover-card-glow">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Input
                className="py-6 px-4 text-lg w-full bg-background dark:bg-background/50 focus-ring border border-muted hover:border-factmedix-primary/50 transition-all"
                placeholder="Paste a health claim here..."
                value={claimText}
                onChange={(e) => setClaimText(e.target.value)}
                disabled={isAnalyzing}
              />
              {claimText && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-ring rounded-full p-1 hover-glow"
                  onClick={() => setClaimText('')}
                  aria-label="Clear text"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="py-6 text-lg w-full bg-factmedix-primary hover:bg-factmedix-secondary transition-colors focus-ring glow-button"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : "Analyze Claim"}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-factmedix-primary glow-dot"></div>
              <span className="ml-1 text-sm text-muted-foreground">Paste</span>
            </div>
            <div className="h-px w-8 bg-muted"></div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-muted"></div>
              <span className="ml-1 text-sm text-muted-foreground">Analyze</span>
            </div>
            <div className="h-px w-8 bg-muted"></div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-muted"></div>
              <span className="ml-1 text-sm text-muted-foreground">Review</span>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
        Try with: "Vitamin C cures the common cold" or "Regular exercise reduces heart disease risk"
      </div>
    </section>
  );
};
