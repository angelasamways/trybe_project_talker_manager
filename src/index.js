const express = require('express');
const fs = require('fs').promises;
const path = require('path');
// const { v4: uuidv4 } = require('uuid');
const { uid } = require('rand-token');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// não remova esse endpoint, e para o avaliador funcionar

const pathTalker = path.resolve(__dirname, './talker.json');

const readTalker = async () => {
  const read = await fs.readFile(pathTalker, 'utf-8');
  const talker = JSON.parse(read);
  return talker;
};

app.get('/talker', async (req, res) => {
  const talkers = await readTalker();
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkerIds = await readTalker();
  const talkerId = talkerIds.find(({ id }) => id === Number(req.params.id));
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', async (req, res) => {
  const token = uid(16);
  res.status(200).json({ token });
  // const { email, password } = req.body;
  // const login = await readTalker();
});

// https://www.npmjs.com/package/rand-token

// https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28

app.listen(PORT, () => {
  console.log('Online');
});
