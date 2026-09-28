import { hindsightClient } from "./hindsightClient";
import prisma from "../../config/db";

const getBankId = (customerId: string) => {
  const prefix = process.env.HINDSIGHT_BANK_PREFIX || 'humantouch';
  return `${prefix}-customer-${customerId}`;
};

export const customerMemoryService = {
  async retainCustomerInteraction(customerId: string, interaction: any): Promise<void> {
    // Determine if it contains meaningful relationship information
    if (!interaction.content && !interaction.subject) return;

    const bankId = getBankId(customerId);
    
    // Create a useful natural-language memory representation
    const memory = `Date: ${interaction.interactionDate || new Date().toISOString().split('T')[0]}
Interaction type: ${interaction.type}

${interaction.subject ? `Subject: ${interaction.subject}\n` : ''}${interaction.content}

Sentiment: ${interaction.sentiment || 'neutral'}
${interaction.outcome ? `Outcome: ${interaction.outcome}` : ''}`;

    await hindsightClient.retain(bankId, memory);
  },

  async recallCustomerMemories(customerId: string, query: string): Promise<any[]> {
    const bankId = getBankId(customerId);
    try {
      const results = await hindsightClient.recall(bankId, query);
      return results;
    } catch (error) {
      // Hindsight failure should not crash the app
      return [];
    }
  },

  async reflectOnCustomer(customerId: string, query: string): Promise<any> {
    const bankId = getBankId(customerId);
    try {
      return await hindsightClient.reflect(bankId, query);
    } catch (error) {
      return null;
    }
  },

  async buildCustomerMemoryContext(customerId: string): Promise<any> {
    let memoryUnavailable = false;
    let relevantMemories: any[] = [];
    
    try {
      const queries = [
        "What important problems has this customer experienced recently?",
        "How has the customer's relationship with the company changed over time?",
        "What previous follow-ups were unsuccessful?",
        "What unresolved issues exist?"
      ];

      const bankId = getBankId(customerId);
      const allResults = await Promise.all(queries.map(q => hindsightClient.recall(bankId, q).catch(() => [])));
      
      // Flatten, map, and deduplicate (assuming Hindsight returns an array of memory objects with a 'content' or 'text' field)
      const memorySet = new Set<string>();
      
      allResults.flat().forEach(item => {
        const memText = item.memory || item.content || item.text || JSON.stringify(item);
        if (memText && !memorySet.has(memText)) {
          memorySet.add(memText);
          relevantMemories.push({
            memory: memText,
            relevance: item.relevance || item.score || 0.9
          });
        }
      });
      
      // Sort by relevance descending
      relevantMemories.sort((a, b) => b.relevance - a.relevance);
      // Take top 10
      relevantMemories = relevantMemories.slice(0, 10);
    } catch (error) {
      console.error("[CustomerMemoryService] Hindsight context building failed:", error);
      memoryUnavailable = true;
    }

    return {
      customerId,
      memoryUnavailable,
      relevantMemories
    };
  }
};
