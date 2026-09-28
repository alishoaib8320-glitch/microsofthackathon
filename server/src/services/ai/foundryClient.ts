import { AIAnalysisResult } from './schemas';

export class FoundryUnavailableError extends Error {
  code = "FOUNDRY_UNAVAILABLE";
  constructor() {
    super("AI analysis temporarily unavailable");
    this.name = "FoundryUnavailableError";
  }
}

export const foundryClient = {
  async analyzeCustomerContext(context: any): Promise<any> {
    const endpoint = process.env.FOUNDRY_PROJECT_ENDPOINT;
    const model = process.env.FOUNDRY_MODEL || "gpt-4o";
    const agentName = process.env.FOUNDRY_AGENT_NAME || "HumanTouchCustomerIntelligence";
    
    if (!endpoint) {
      console.warn("[Foundry] No FOUNDRY_PROJECT_ENDPOINT set. Simulating Foundry failure or mocking.");
      throw new FoundryUnavailableError();
    }

    const systemPrompt = `You are the ${agentName}.
Your job is to analyze customer relationships and determine the level of human attention currently required.

You will receive:
1. Customer profile information
2. Recent interactions
3. Relevant long-term customer memories retrieved from Hindsight
4. Previous AI analyses
5. Open recommendations
6. Relevant visit history

Analyze the relationship across time.
Do not analyze only the latest interaction.

Consider:
- current sentiment
- historical sentiment
- urgency
- unresolved issues
- repeated unsuccessful follow-ups
- customer responsiveness
- engagement changes
- relationship deterioration
- relationship recovery
- customer preferences
- previous complaints
- previous resolutions
- deal value
- business importance
- current opportunity status
- frequency of interactions
- changes in customer behavior
- evidence contained in retrieved memories

Do not invent facts.
Only use evidence supplied in the input.
Clearly distinguish evidence from inference.

A historical positive relationship does not automatically mean the current situation is low priority.
A single negative interaction does not automatically mean the customer is critical.
High deal value alone must not determine the result.

If insufficient evidence exists, reduce confidence and mark insufficientEvidence as true.

Return ONLY the requested structured output as JSON.
Do not send emails.
Do not make phone calls.
Do not schedule physical visits yourself.
Do not modify databases.
Do not execute external actions.
Your role is analysis and recommendation only.`;

    try {
      // Simulate calling Foundry via REST POST
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.FOUNDRY_API_KEY || ''}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: JSON.stringify(context, null, 2) }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        console.error(`[Foundry Error] Status: ${response.status}`);
        throw new FoundryUnavailableError();
      }

      const data = await response.json();
      
      // Parse LLM JSON output (assuming OpenAI compatible format)
      let contentString = data?.choices?.[0]?.message?.content;
      if (!contentString) {
        // Handle alternative response formats
        contentString = data?.content || JSON.stringify(data);
      }
      
      const parsedResult = JSON.parse(contentString);
      return parsedResult;
    } catch (error: any) {
      console.error("[Foundry Error]", error.message);
      throw new FoundryUnavailableError();
    }
  }
};
