import express, { Express } from 'express';

const app: Express = express();

app.use(express.json());
app.get('/', (_, res) => {
  res.send('Hello World!');
});

export default app;
