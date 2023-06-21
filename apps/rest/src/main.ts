import express from 'express';
import file from './file/router';
import auth from './auth/router';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use('/file', file);
app.use(auth);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
