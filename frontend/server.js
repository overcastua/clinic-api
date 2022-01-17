import { config } from 'dotenv';
config();

import express from 'express';
import path from 'path';
import reload from 'reload';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.DEFAULT_PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), './assets/main.html'));
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`The frontend server is listening on port ${PORT}...`);
});

reload(app);
