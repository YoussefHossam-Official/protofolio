// validation bta3t el admin CRUD — kol endpoint lazem yt2kd mn el data

module.exports.validateProject = (req, res, next) => {
  const { title, description, techStack } = req.body;
  const errors = [];
  if (!title || String(title).trim().length < 2) errors.push('el title m4 kafy');
  if (!description || String(description).trim().length < 1) errors.push('el description matnf34 tkon fadya');
  if (req.method === 'POST' && (!techStack || !Array.isArray(techStack) || techStack.length === 0)) {
    errors.push('el tech stack m4 sa7 (lazem array mn strings)');
  }
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};

module.exports.validateSite = (req, res, next) => {
  const { name } = req.body;
  if (!name || String(name).trim().length < 1) {
    return res.status(400).json({ error: 'laazem ykon fe name lel site' });
  }
  next();
};

module.exports.validateSkills = (req, res, next) => {
  const { languages, frameworks, databases, tools } = req.body;
  if (!Array.isArray(languages) && !Array.isArray(frameworks) && !Array.isArray(databases) && !Array.isArray(tools)) {
    return res.status(400).json({ error: '3ala 2l 7aga wa7da mn el skills categories lazem tkon array' });
  }
  next();
};

module.exports.validateExperience = (req, res, next) => {
  const { company, position } = req.body;
  const errors = [];
  if (!company || String(company).trim().length < 1) errors.push('el company lazem ykon mawgod');
  if (!position || String(position).trim().length < 1) errors.push('el position matnf34 ykon fady');
  if (errors.length) return res.status(400).json({ error: errors.join('; ') });
  next();
};
