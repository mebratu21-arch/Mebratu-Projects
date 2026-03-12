import app from './app';
import { config } from './config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║   🚀 Secure Todo API Server                  ║
  ║   Running on port ${PORT}                      ║
  ║   Environment: ${config.nodeEnv.padEnd(16)}          ║
  ╚═══════════════════════════════════════════════╝
  `);
});
