
import React from 'react';

export const AnimatedShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Primary circle with glow */}
      <div 
        className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-factmedix-primary/10 dark:bg-factmedix-primary/5 
                  animate-float blur-3xl glow-blob"
      />
      
      {/* Blue blob with motion */}
      <div 
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-300/10 dark:bg-blue-400/5 
                  animate-pulse-light blur-3xl glow-blob"
        style={{ animationDelay: '1s' }}
      />
      
      {/* Small purple shape */}
      <div 
        className="absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-factmedix-light/20 dark:bg-factmedix-light/10 
                  animate-float blur-2xl glow-blob"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Small floating circles with enhanced glow */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-factmedix-primary/5 dark:bg-factmedix-primary/10 rounded-full animate-float blur-xl glow-particle"
          style={{
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${Math.random() * 8 + 6}s`
          }}
        />
      ))}
      
      {/* Rotating gradient ring with glow */}
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border-[16px] border-factmedix-primary/10 
                  dark:border-factmedix-primary/5 animate-rotate-slow blur-md glow-ring"
      />

      {/* New animated elements */}
      {/* Floating particles with parallax effect */}
      <div className="particle-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute bg-white dark:bg-factmedix-light/30 rounded-full animate-particle glow-dot"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>
      
      {/* Geometric shapes with motion */}
      <div 
        className="absolute top-1/6 right-1/5 w-40 h-40 bg-gradient-to-br from-factmedix-primary/5 to-transparent 
                 dark:from-factmedix-light/10 dark:to-transparent rotate-45 animate-morph blur-lg"
      />
      
      <div 
        className="absolute bottom-1/4 left-1/6 w-60 h-60 rounded-lg bg-factmedix-secondary/5
                  dark:bg-factmedix-secondary/10 rotate-12 animate-float-slow blur-xl"
        style={{ animationDelay: '3s' }}
      />

      {/* Glowing orbs with pulsating effect */}
      <div className="absolute top-[35%] right-[20%] w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 glow-orb"></div>
      <div className="absolute bottom-[30%] left-[25%] w-8 h-8 rounded-full bg-white/10 dark:bg-white/5 glow-orb" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-[15%] left-[40%] w-16 h-16 rounded-full bg-white/10 dark:bg-white/5 glow-orb" style={{ animationDelay: '2.5s' }}></div>
    </div>
  );
};
