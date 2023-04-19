import express from 'express';

import handler from './chat';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.set('port', process.env.NEXT_PUBLIC_EXPRESS_PORT);

app.get('/', (req, res) => {
  res.send('Hello');
});
app.post('/chat', handler);

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
