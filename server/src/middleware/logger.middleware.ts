import morgan from 'morgan';
import { config } from '../config';

// Use 'dev' format in development (colored, concise)
// Use 'combined' format in production (standard Apache format)
const loggerMiddleware = morgan(
  config.nodeEnv === 'production' ? 'combined' : 'dev'
);

export default loggerMiddleware;
