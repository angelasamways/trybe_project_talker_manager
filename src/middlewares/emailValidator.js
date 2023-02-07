const emailValidator = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }

  const validEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const emailTest = validEmail.test(email);

  if (!emailTest) {
    return res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

module.exports = emailValidator;