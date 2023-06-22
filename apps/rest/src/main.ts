import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import file from './file/router';
import auth from './auth/router';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);
app.use('/file', file);
app.use(auth);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
