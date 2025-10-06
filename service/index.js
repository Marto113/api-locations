import express from 'express';
import locationRouter from './routes/locationRoute.js';

const app = express();

app.use(express.json());
// Mount API routers under /api
app.use('/api', locationRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
