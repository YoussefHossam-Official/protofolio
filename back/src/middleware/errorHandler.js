// da by3ml handle le ay error by7sal fe el app
// bnmsko kol error w nrg3 response mn 8er ma el app tw2af

function errorHandler(err, req, res, next) {
  // bn7ot el error fe el log 3ashan el developer y4ofo (msh el user)
  console.error(err.stack);
  
  // bnrg3 status code (500 law m4 mawgod) w error message
  res.status(err.status || 500).json({
    error: err.message || '7asal 8alat fe el server, 3arfne b2a',
  });
}

module.exports = errorHandler;
