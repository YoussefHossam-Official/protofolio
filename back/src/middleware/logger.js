// da by3ml log le kol request — y3ny el URL, el method, el time
// 3ashan lw 7asal 8alat, n3rf eh el request elly 5alas

function logger(req, res, next) {
  const start = Date.now();
  
  // lama el response y5ls, bn7ot log
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  
  next();
}

module.exports = logger;
