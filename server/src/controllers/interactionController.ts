import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { customerMemoryService } from '../services/memory/customerMemoryService';

export const createInteraction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const customerId = req.params.id as string;
    const { type, content, subject, sentiment, urgency, outcome, interactionDate } = req.body;

    let interaction: any = {
      id: `int_${Date.now()}`,
      customerId,
      type: type || 'NOTE',
      content,
      subject,
      sentiment: sentiment || 'NEUTRAL',
      urgency: urgency || 'LOW',
      outcome,
      interactionDate: interactionDate ? new Date(interactionDate) : new Date()
    };

    try {
      interaction = await prisma.interaction.create({
        data: {
          customerId,
          type: type || 'NOTE',
          content,
          subject,
          sentiment: sentiment || 'NEUTRAL',
          urgency: urgency || 'LOW',
          interactionDate: interactionDate ? new Date(interactionDate) : new Date()
        }
      });
    } catch (dbErr) {
      console.warn('[DB Connection Warning] Interaction created in-memory fallback (DB offline)');
    }

    // Retain memory in Hindsight
    await customerMemoryService.retainCustomerInteraction(customerId, interaction);

    res.status(201).json({ success: true, data: interaction });
  } catch (error) {
    next(error);
  }
};
