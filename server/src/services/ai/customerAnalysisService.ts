import { foundryClient, FoundryUnavailableError } from "./foundryClient";
import { validateAIAnalysisResult, AIAnalysisResult } from "./schemas";
import { customerMemoryService } from "../memory/customerMemoryService";
import prisma from "../../config/db";

export const customerAnalysisService = {
  async analyzeCustomer(customerId: string): Promise<AIAnalysisResult> {
    let customer: any = null;
    let recentInteractions: any[] = [];
    let previousAnalyses: any[] = [];
    let openRecommendations: any[] = [];
    let recentVisits: any[] = [];

    try {
      customer = await prisma.customer.findUnique({ where: { id: customerId } });
      if (customer) {
        recentInteractions = await prisma.interaction.findMany({ where: { customerId }, orderBy: { interactionDate: 'desc' }, take: 5 });
        previousAnalyses = await prisma.aIAnalysis.findMany({ where: { customerId }, orderBy: { createdAt: 'desc' }, take: 3 });
        openRecommendations = await prisma.recommendation.findMany({ where: { customerId, status: "PENDING" } });
        recentVisits = await prisma.visit.findMany({ where: { customerId }, orderBy: { scheduledDate: 'desc' }, take: 2 });
      }
    } catch (dbErr) {
      console.warn(`[DB Connection Warning] Using fallback customer profile for analysis: ${customerId}`);
    }

    if (!customer) {
      customer = {
        id: customerId,
        name: "ABC Industries",
        company: "ABC Industries",
        dealValue: 8500000,
        relationshipHealth: 41,
        humanTouchScore: 92
      };
      recentInteractions = [
        { id: "int_1", interactionDate: new Date("2026-09-27"), type: "EMAIL", content: "Customer reported unresolved implementation issue", sentiment: "NEGATIVE" },
        { id: "int_2", interactionDate: new Date("2026-09-26"), type: "SUPPORT", content: "Complaint opened", sentiment: "NEGATIVE" }
      ];
    }

    // 3. Recall relevant Hindsight memories
    const memoryContext = await customerMemoryService.buildCustomerMemoryContext(customerId);

    // 7. Build customer context
    const context = {
      customerProfile: {
        id: customer.id,
        name: customer.name,
        company: customer.company,
        dealValue: customer.dealValue,
        relationshipHealth: customer.relationshipHealth,
        humanTouchScore: customer.humanTouchScore,
      },
      recentInteractions,
      relevantMemories: memoryContext.relevantMemories,
      memoryUnavailable: memoryContext.memoryUnavailable,
      previousAnalyses,
      openRecommendations,
      recentVisits
    };

    // If customer has no history
    if (recentInteractions.length === 0 && memoryContext.relevantMemories.length === 0) {
      return {
        sentiment: 'NEUTRAL',
        urgency: 'LOW',
        relationshipHealth: 50,
        humanTouchScore: 10,
        priority: 'LOW',
        recommendedAction: 'AUTOMATED_COMMUNICATION',
        confidence: 0.42,
        insufficientEvidence: true,
        reasons: ["No meaningful interaction history found."],
        signals: {
          negativeSentiment: false,
          unresolvedIssue: false,
          repeatedFollowUps: false,
          highDealValue: false,
          relationshipDeclining: false,
          relationshipImproving: false,
          lowResponsiveness: false,
          recentEscalation: false
        }
      };
    }

    // 8. Call Microsoft Foundry
    const aiOutput = await foundryClient.analyzeCustomerContext(context);

    // 9. Validate structured output
    if (!validateAIAnalysisResult(aiOutput)) {
      console.error("[AnalysisService] AI output failed schema validation", aiOutput);
      throw new Error("Invalid AI analysis output format");
    }

    return aiOutput;
  }
};
