
import React, { useEffect, useState } from 'react';
import { VerdictData } from '@/types';
import { Button } from '@/components/ui/button';
import { Check, AlertTriangle, X, Link } from 'lucide-react';

interface VerdictPanelProps {
  verdict: VerdictData;
  originalClaim: string;
  onReset: () => void;
}

export const VerdictPanel: React.FC<VerdictPanelProps> = ({ verdict, originalClaim, onReset }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getVerdictColors = () => {
    switch(verdict.type) {
      case 'trusted':
        return "text-green-600 dark:text-green-400 bg-factmedix-trusted glow-trusted";
      case 'unclear': 
        return "text-yellow-600 dark:text-yellow-400 bg-factmedix-unclear glow-unclear";
      case 'misleading':
        return "text-red-600 dark:text-red-400 bg-factmedix-misleading glow-misleading";
      default:
        return "";
    }
  };

  const getVerdictIcon = () => {
    switch(verdict.type) {
      case 'trusted':
        return <Check className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" />;
      case 'unclear':
        return <AlertTriangle className="h-6 w-6 mr-2 text-yellow-600 dark:text-yellow-400" />;
      case 'misleading':
        return <X className="h-6 w-6 mr-2 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const getVerdictLabel = () => {
    switch(verdict.type) {
      case 'trusted': return "Trusted";
      case 'unclear': return "Unclear";
      case 'misleading': return "Misleading";
      default: return "Unknown";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 animate-scale-in">
      <div className="glass-card p-8 hover-card-glow">
        {/* Progress indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-factmedix-primary glow-dot"></div>
            <span className="ml-1 text-sm text-muted-foreground">Paste</span>
          </div>
          <div className="h-px w-8 bg-muted"></div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-factmedix-primary glow-dot"></div>
            <span className="ml-1 text-sm text-muted-foreground">Analyze</span>
          </div>
          <div className="h-px w-8 bg-muted"></div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-factmedix-primary glow-dot"></div>
            <span className="ml-1 text-sm text-muted-foreground">Review</span>
          </div>
        </div>
      
        {/* Original claim */}
        <div className="bg-muted dark:bg-muted/50 p-4 rounded-lg mb-6">
          <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Original Claim</h3>
          <p className="text-foreground">{originalClaim}</p>
        </div>
        
        {/* Verdict display */}
        <div className="mb-6">
          <div className={`flex items-center p-4 rounded-lg ${getVerdictColors()}`}>
            {getVerdictIcon()}
            <span className="font-semibold">{getVerdictLabel()}</span>
          </div>
          
          <div className="mt-4 space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-foreground">{verdict.explanation}</p>
          </div>
        </div>
        
        {/* Sources */}
        {animationComplete && verdict.sources.length > 0 && (
          <div className="mt-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">Sources</h3>
            <div className="space-y-2">
              {verdict.sources.map((source, i) => (
                <a 
                  key={i}
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-muted/50 hover:bg-muted transition-colors rounded-lg text-sm text-foreground focus-ring hover-link-glow"
                >
                  <Link className="h-4 w-4 mr-2 text-factmedix-primary" />
                  {source.title}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Button 
            onClick={onReset}
            variant="outline" 
            className="focus-ring hover:bg-muted transition-colors hover-glow"
          >
            Check Another Claim
          </Button>
        </div>
      </div>
    </div>
  );
};
