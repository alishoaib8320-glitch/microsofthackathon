import { AIAnalysisResult } from "../ai/schemas";

export interface DecisionEngineResult {
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  action: 'AUTOMATED_COMMUNICATION' | 'FOLLOW_UP' | 'SALES_CALL' | 'PHYSICAL_VISIT' | 'ESCALATION';
  approvalRequired: boolean;
  requiresHumanReview: boolean;
}

export const decisionEngine = {
  process(aiAnalysis: AIAnalysisResult, customerData: any): DecisionEngineResult {
    // Determine priority based on Human Touch Score (with AI override support)
    // Default thresholds
    let calculatedPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    const score = aiAnalysis.humanTouchScore;
    
    if (score >= 80) calculatedPriority = 'CRITICAL';
    else if (score >= 61) calculatedPriority = 'HIGH';
    else if (score >= 31) calculatedPriority = 'MEDIUM';

    // The AI might suggest a priority, but we cap/override based on strict business rules if needed.
    // For this implementation, we take the AI's priority if it's higher than the threshold calc, 
    // or just trust the score calculation.
    const finalPriority = calculatedPriority; // Adhering to the hard threshold rule

    let finalAction = aiAnalysis.recommendedAction;
    let approvalRequired = false;
    let requiresHumanReview = false;

    // HIGH-IMPACT ACTION SAFETY
    if (['PHYSICAL_VISIT', 'ESCALATION'].includes(finalAction)) {
      approvalRequired = true;
    }

    // CONFIDENCE RULE
    if (aiAnalysis.confidence < 0.70 || aiAnalysis.insufficientEvidence) {
      requiresHumanReview = true;
      approvalRequired = true;
    }

    return {
      priority: finalPriority,
      action: finalAction,
      approvalRequired,
      requiresHumanReview
    };
  }
};
