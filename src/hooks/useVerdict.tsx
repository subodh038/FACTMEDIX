
import { useState, useCallback } from 'react';
import { VerdictData, VerdictType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/context/AuthContext';

// Mock data for demo purposes - in a real app, this would connect to an actual API
const mockResults: Record<string, VerdictData> = {
  "vitamin c cures the common cold": {
    type: 'unclear',
    explanation: "There's limited evidence that vitamin C can reduce the duration of cold symptoms in some people, but it does not 'cure' the common cold. The scientific consensus is that it may provide a minor benefit for some individuals if taken regularly, but the effect is not strong enough to consider it a cure.",
    sources: [
      {
        title: "NIH: Vitamin C and Colds",
        url: "https://www.nccih.nih.gov/health/vitamin-c"
      },
      {
        title: "Harvard Health: Vitamin C for Colds",
        url: "https://www.health.harvard.edu/cold-and-flu/can-vitamin-c-prevent-a-cold"
      }
    ]
  },
  "regular exercise reduces heart disease risk": {
    type: 'trusted',
    explanation: "This claim is supported by strong scientific evidence. Regular physical activity reduces the risk of cardiovascular disease by improving heart function, lowering blood pressure, reducing inflammation, and maintaining healthy weight and cholesterol levels.",
    sources: [
      {
        title: "American Heart Association: Exercise and Heart Health",
        url: "https://www.heart.org/en/healthy-living/fitness/fitness-basics/aha-recs-for-physical-activity-in-adults"
      },
      {
        title: "CDC: Physical Activity for Heart Health",
        url: "https://www.cdc.gov/heartdisease/prevention.htm"
      },
      {
        title: "Mayo Clinic: Exercise and Heart Disease",
        url: "https://www.mayoclinic.org/diseases-conditions/heart-disease/in-depth/heart-disease-prevention/art-20046502"
      }
    ]
  },
  "drinking bleach kills coronavirus": {
    type: 'misleading',
    explanation: "This claim is dangerous and false. Drinking bleach is extremely harmful and potentially fatal. No health authority recommends consuming bleach to treat or prevent COVID-19 or any other illness. Bleach is a caustic chemical that causes severe damage to the digestive system and internal organs.",
    sources: [
      {
        title: "CDC: Hazards of Drinking Bleach",
        url: "https://emergency.cdc.gov/han/2020/han00431.asp"
      },
      {
        title: "WHO: Mythbusters - COVID-19",
        url: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
      }
    ]
  }
};

// Default verdict for claims not in our mock data
const defaultVerdict: VerdictData = {
  type: 'unclear',
  explanation: "We don't have enough information to verify this specific claim. The claim may be partly true but lacks context or strong scientific evidence. Always consult healthcare professionals for medical advice.",
  sources: [
    {
      title: "How to Evaluate Health Information",
      url: "https://www.nih.gov/health-information/nih-clinical-research-trials-you/finding-and-evaluating-online-resources"
    }
  ]
};

export const useVerdict = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verdict, setVerdict] = useState<VerdictData | null>(null);
  const [originalClaim, setOriginalClaim] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  const saveToHistory = async (claim: string, verdictData: VerdictData) => {
    if (!user) return; // Only save history for authenticated users
    
    try {
      const { error } = await supabase
        .from('claim_history')
        .insert({
          user_id: user.id,
          original_claim: claim,
          verdict_type: verdictData.type,
          verdict_explanation: verdictData.explanation,
          sources: verdictData.sources
        });
      
      if (error) {
        console.error('Error saving to history:', error);
        toast({
          title: "Couldn't save to history",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const analyzeHealthClaim = useCallback((claimText: string) => {
    setIsAnalyzing(true);
    setOriginalClaim(claimText);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      try {
        // Check if we have a mock response for this claim
        const normalizedClaim = claimText.trim().toLowerCase();
        const result = Object.keys(mockResults).find(key => 
          normalizedClaim.includes(key)
        );
        
        // Get the verdict
        const verdictData = result ? mockResults[result] : defaultVerdict;
        
        setVerdict(verdictData);
        setIsAnalyzing(false);
        
        // Save to history if user is logged in
        if (user) {
          saveToHistory(claimText, verdictData);
        }
        
      } catch (error) {
        console.error('Error analyzing claim:', error);
        toast({
          title: "Analysis failed",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
        setIsAnalyzing(false);
      }
    }, 2000);
  }, [toast, user]);

  const resetVerdict = useCallback(() => {
    setVerdict(null);
    setOriginalClaim('');
  }, []);

  return {
    isAnalyzing,
    verdict,
    originalClaim,
    analyzeHealthClaim,
    resetVerdict
  };
};
