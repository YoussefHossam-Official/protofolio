// hna el validation bta3et el pages module

const validators = {};

// bn3ml check 3ala el slug — law fady aw 8alat, bnrg3 error
validators.validateSlug = (req, res, next) => {
  const { slug } = req.params;
  if (!slug || typeof slug !== 'string' || slug.length < 1) {
    return res.status(400).json({ error: 'el slug m4 sa7, tanya' });
  }
  next();
};

module.exports = validators;
