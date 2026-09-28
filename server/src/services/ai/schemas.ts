export interface AIAnalysisResult {
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  relationshipHealth: number; // 0-100
  humanTouchScore: number; // 0-100
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendedAction: 'AUTOMATED_COMMUNICATION' | 'FOLLOW_UP' | 'SALES_CALL' | 'PHYSICAL_VISIT' | 'ESCALATION';
  confidence: number; // 0.0 - 1.0
  insufficientEvidence: boolean;
  reasons: string[];
  signals: {
    negativeSentiment: boolean;
    unresolvedIssue: boolean;
    repeatedFollowUps: boolean;
    highDealValue: boolean;
    relationshipDeclining: boolean;
    relationshipImproving: boolean;
    lowResponsiveness: boolean;
    recentEscalation: boolean;
  };
}

export function validateAIAnalysisResult(data: any): data is AIAnalysisResult {
  if (!data) return false;
  
  if (!['POSITIVE', 'NEUTRAL', 'NEGATIVE'].includes(data.sentiment)) return false;
  if (!['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(data.urgency)) return false;
  
  if (typeof data.relationshipHealth !== 'number' || data.relationshipHealth < 0 || data.relationshipHealth > 100) return false;
  if (typeof data.humanTouchScore !== 'number' || data.humanTouchScore < 0 || data.humanTouchScore > 100) return false;
  
  if (!['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(data.priority)) return false;
  if (!['AUTOMATED_COMMUNICATION', 'FOLLOW_UP', 'SALES_CALL', 'PHYSICAL_VISIT', 'ESCALATION'].includes(data.recommendedAction)) return false;
  
  if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) return false;
  if (typeof data.insufficientEvidence !== 'boolean') return false;
  
  if (!Array.isArray(data.reasons) || data.reasons.length === 0) return false;
  
  if (!data.signals || typeof data.signals !== 'object') return false;
  
  return true;
}
