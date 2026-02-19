import dotenv from 'dotenv';
import app from './app.js';
import { testDbConnection } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await testDbConnection();
    app.listen(PORT, () => {
      console.log(`🚀 TaskFlow API corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
