const express = require('express');
const fs = require('fs').promises;
const path = require('path');

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
  try {
    const talkerIds = await readTalker();
    const talkerId = talkerIds.find(({ id }) => id === Number(req.params.id));
    res.status(200).json(talkerId);
  } catch (error) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
