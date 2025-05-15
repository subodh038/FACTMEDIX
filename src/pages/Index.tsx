
import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AnimatedShapes } from '@/components/AnimatedShapes';
import { VerdictPanel } from '@/components/VerdictPanel';
import { Footer } from '@/components/Footer';
import { useVerdict } from '@/hooks/useVerdict';
import { ThemeProvider } from '@/context/ThemeContext';

const Index = () => {
  const { isAnalyzing, verdict, originalClaim, analyzeHealthClaim, resetVerdict } = useVerdict();

  return (
    <ThemeProvider>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <AnimatedShapes />
        
        <main className="flex-1">
          {!verdict ? (
            <Hero onAnalyze={analyzeHealthClaim} isAnalyzing={isAnalyzing} />
          ) : (
            <VerdictPanel 
              verdict={verdict} 
              originalClaim={originalClaim}
              onReset={resetVerdict}
            />
          )}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
