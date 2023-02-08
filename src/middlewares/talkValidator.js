const talkValidator = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
};
module.exports = talkValidator;
