
import React from 'react';
import { Github, FileText, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground order-2 md:order-1">
            <p className="font-medium">Not a substitute for professional medical advice</p>
            <p className="text-xs mt-1">© {new Date().getFullYear()} FactMedix. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6 order-1 md:order-2 mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground focus-ring rounded-full p-1 transition-colors hover-glow"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground focus-ring rounded-full p-1 transition-colors hover-glow"
              aria-label="Privacy Policy"
            >
              <Shield className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground focus-ring rounded-full p-1 transition-colors hover-glow"
              aria-label="About"
            >
              <FileText className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
