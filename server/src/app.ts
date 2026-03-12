import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import loggerMiddleware from './middleware/logger.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';

const app = express();

// ─── Security Middleware ───────────────────────────────
// Helmet: sets various HTTP headers for security
app.use(helmet());

// CORS: restrict which origins can access the API
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate Limiting: prevent brute force / DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // only 20 auth attempts per 15 minutes
  message: { success: false, error: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Logging ───────────────────────────────────────────
app.use(loggerMiddleware);

// ─── Routes ────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// ─── Error Handling ────────────────────────────────────
app.use(errorMiddleware);

export default app;
