const ageValidator = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  if (!Number.isInteger(age)) {
    return res.status(400).send({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }
  if (!Number(age)) {
    return res.status(400).send({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  next();
};
module.exports = ageValidator;
