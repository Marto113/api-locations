import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from 'express';
import locationRouter from './routes/locationRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const app = express();

app.use(express.json());
app.get('/api', (req, res) => {
  res.send('API root — available endpoints: GET /api/locations, POST /api/locations');
});

app.use('/api', locationRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log('process.env.DATABASE_URL=', process.env.DATABASE_URL ? '[REDACTED]' : 'undefined');


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
