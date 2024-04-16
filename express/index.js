import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import corsOptions from './config/cors.config.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env['PORT'];
app.use(express.json());
app.use(cors(corsOptions));
app.use('/', router);
app.use(errorHandler);


app.listen(PORT, () => console.log(`server start on port http://localhost:${PORT}`));
