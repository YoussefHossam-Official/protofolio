// hna bnt2kd en el data beta3t el project sa7 abl ma t4al

const validators = {};

// validation 3ala create project
validators.validateCreate = (req, res, next) => {
  const { title, description, techStack } = req.body;
  const errors = [];
  if (!title || String(title).trim().length < 2) errors.push('el title 2aleel, hat 2asmo 3ala el2a');
  if (!description || String(description).trim().length < 1) errors.push('el description matnf34 tkon fadya');
  if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
    errors.push('el tech stack lazem ykon array w m4 fady');
  }
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};

// validation 3ala update project
validators.validateUpdate = (req, res, next) => {
  const { title } = req.body;
  if (title !== undefined && String(title).trim().length < 2) {
    return res.status(400).json({ error: 'el title b3d kda 2aleel' });
  }
  next();
};

module.exports = validators;
