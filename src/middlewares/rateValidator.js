const rateValidator = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (Number(rate) < 1 || Number(rate) > 5 || !Number.isInteger(rate)) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!rate) {
    return res.status(400).send({
      message: 'O campo "rate" é obrigatório',
    });
  }
  next();
};
module.exports = rateValidator;
