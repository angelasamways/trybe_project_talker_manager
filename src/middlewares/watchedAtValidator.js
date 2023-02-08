const watchedAtValidator = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateFormat = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  // https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateFormat.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};
module.exports = watchedAtValidator;
