import { HindsightClient } from "@vectorize-io/hindsight-client";

const getClient = () => {
  return new HindsightClient({
    baseUrl: process.env.HINDSIGHT_BASE_URL || 'https://api.vectorize.io'
  });
};

export const hindsightClient = {
  async retain(bankId: string, content: string): Promise<void> {
    if (process.env.HINDSIGHT_ENABLED !== 'true') {
      console.log(`[Hindsight Disabled] Would retain to ${bankId}: ${content}`);
      return;
    }
    try {
      const client = getClient();
      await client.retain(bankId, content);
      console.log(`[Hindsight] Retained memory for ${bankId}`);
    } catch (error) {
      console.error(`[Hindsight Error] Failed to retain memory for ${bankId}:`, error);
      // We log but do not throw, as memory should not crash the app
    }
  },

  async recall(bankId: string, query: string): Promise<any> {
    if (process.env.HINDSIGHT_ENABLED !== 'true') {
      console.log(`[Hindsight Disabled] Would recall from ${bankId}: ${query}`);
      return [];
    }
    try {
      const client = getClient();
      const results = await client.recall(bankId, query);
      console.log(`[Hindsight] Recalled memories for ${bankId}`);
      return results || [];
    } catch (error) {
      console.error(`[Hindsight Error] Failed to recall memory for ${bankId}:`, error);
      throw error; // Let the caller handle unavailability
    }
  },

  async reflect(bankId: string, query: string): Promise<any> {
    if (process.env.HINDSIGHT_ENABLED !== 'true') return null;
    try {
      const client = getClient();
      return await client.reflect(bankId, query);
    } catch (error) {
      console.error(`[Hindsight Error] Failed to reflect on memory for ${bankId}:`, error);
      throw error;
    }
  }
};
