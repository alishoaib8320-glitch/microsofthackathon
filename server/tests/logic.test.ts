import { decisionEngine } from '../src/services/decision/decisionEngine';
import { validateAIAnalysisResult } from '../src/services/ai/schemas';

describe('Decision Engine', () => {
  it('Test 4 — Decision Engine (Priority Thresholds)', () => {
    // 0–30 → LOW
    expect(decisionEngine.process({ humanTouchScore: 20, recommendedAction: 'FOLLOW_UP', confidence: 0.9, insufficientEvidence: false } as any, {}).priority).toBe('LOW');
    // 31–60 → MEDIUM
    expect(decisionEngine.process({ humanTouchScore: 50, recommendedAction: 'FOLLOW_UP', confidence: 0.9, insufficientEvidence: false } as any, {}).priority).toBe('MEDIUM');
    // 61–79 → HIGH
    expect(decisionEngine.process({ humanTouchScore: 70, recommendedAction: 'FOLLOW_UP', confidence: 0.9, insufficientEvidence: false } as any, {}).priority).toBe('HIGH');
    // 80–100 → CRITICAL
    expect(decisionEngine.process({ humanTouchScore: 90, recommendedAction: 'PHYSICAL_VISIT', confidence: 0.9, insufficientEvidence: false } as any, {}).priority).toBe('CRITICAL');
  });

  it('Test 5 — Low confidence causes human review', () => {
    const res = decisionEngine.process({ humanTouchScore: 90, recommendedAction: 'FOLLOW_UP', confidence: 0.6, insufficientEvidence: false } as any, {});
    expect(res.requiresHumanReview).toBe(true);
    expect(res.approvalRequired).toBe(true);
  });

  it('Test 6 — No history causes insufficient evidence logic', () => {
    const res = decisionEngine.process({ humanTouchScore: 50, recommendedAction: 'FOLLOW_UP', confidence: 0.5, insufficientEvidence: true } as any, {});
    expect(res.requiresHumanReview).toBe(true);
  });
});

describe('AI Schema Validator', () => {
  it('Test 9 — Invalid AI output rejects', () => {
    expect(validateAIAnalysisResult({})).toBe(false);
    expect(validateAIAnalysisResult({
      sentiment: "POSITIVE",
      urgency: "LOW",
      relationshipHealth: 150, // invalid range
      humanTouchScore: 50,
      priority: "LOW",
      recommendedAction: "AUTOMATED_COMMUNICATION",
      confidence: 0.9,
      insufficientEvidence: false,
      reasons: ["Test"],
      signals: {}
    })).toBe(false);
  });
});
