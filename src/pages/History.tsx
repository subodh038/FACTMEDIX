
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Check, AlertTriangle, X, ChevronRight, Calendar, Clock } from 'lucide-react';
import { formatDistance } from 'date-fns';

const History = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('claim_history')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching history:', error);
        } else {
          setHistory(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, [user]);
  
  const getVerdictIcon = (type: string) => {
    switch(type) {
      case 'trusted':
        return <Check className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'unclear':
        return <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case 'misleading':
        return <X className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };
  
  const getVerdictClass = (type: string) => {
    switch(type) {
      case 'trusted':
        return "bg-factmedix-trusted text-green-600 dark:text-green-400";
      case 'unclear': 
        return "bg-factmedix-unclear text-yellow-600 dark:text-yellow-400";
      case 'misleading':
        return "bg-factmedix-misleading text-red-600 dark:text-red-400";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-br from-factmedix-primary to-factmedix-secondary bg-clip-text text-transparent">
          Your Claim History
        </h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-factmedix-primary border-t-transparent rounded-full"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h3 className="font-medium text-lg mb-2">No claims yet</h3>
            <p className="text-muted-foreground">
              Your verified health claims will appear here after you submit them.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="glass-card p-6 hover-card-glow transition-all animate-fade-in">
                <div className="flex justify-between items-start mb-3">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerdictClass(item.verdict_type)}`}>
                    {getVerdictIcon(item.verdict_type)}
                    <span className="ml-1 capitalize">{item.verdict_type}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(item.created_at).toLocaleDateString()}
                    <Clock className="h-3 w-3 ml-3 mr-1" />
                    {formatDistance(new Date(item.created_at), new Date(), { addSuffix: true })}
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-medium text-lg">"{item.original_claim}"</h3>
                </div>
                
                <div className="border-t border-border pt-3 mt-3">
                  <p className="text-sm text-muted-foreground">
                    {item.verdict_explanation.length > 150 
                      ? `${item.verdict_explanation.substring(0, 150)}...` 
                      : item.verdict_explanation}
                  </p>
                </div>
                
                <div className="mt-4">
                  <div className="text-xs text-muted-foreground flex items-center">
                    <span className="mr-1">Sources:</span> 
                    {JSON.parse(item.sources).length} references
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
