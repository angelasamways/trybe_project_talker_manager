const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { uid } = require('rand-token');
const ageValidator = require('./middlewares/ageValidator');
const autValidator = require('./middlewares/autValidator');
const emailValidator = require('./middlewares/emailValidator');
const nameValidator = require('./middlewares/nameValidator');
const passwordValidator = require('./middlewares/passwordValidator');
const rateValidator = require('./middlewares/rateValidator');
const talkValidator = require('./middlewares/talkValidator');
const watchedAtValidator = require('./middlewares/watchedAtValidator');

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

app.post('/login', emailValidator, passwordValidator, (req, res) => {
  const token = uid(16);
  res.status(200).json({ token });
});

// https://www.npmjs.com/package/rand-token

// https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28

app.post('/talker', autValidator,
ageValidator, nameValidator, talkValidator, rateValidator, watchedAtValidator, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = await readTalker();
  const talkerId = talker[talker.length - 1].id;
  const newTalker = { name, age, id: talkerId + 1, talk: { watchedAt, rate } };
  talker.push(newTalker);
  await fs.writeFile(pathTalker, JSON.stringify(talker));
  return res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
