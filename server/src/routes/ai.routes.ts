import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { aiService } from '../services/ai.service';
import db from '../db/connection';

const router = Router();

// All AI routes require authentication
router.use(authMiddleware);

router.post('/chat', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, error: 'Message is required' });
      return;
    }

    // Fetch user's todos for context
    const todos = await db('todos').where({ user_id: userId }).select('*');

    // Get AI response
    const response = aiService.analyze(message, todos);

    res.json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
});

export default router;
