const { authJwt } = require('../middleware');
const controller = require('../controllers/capster.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/capsters',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addCapster
  )

  app.put(
    '/api/capsters/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateCapster
  )

  app.get(
    '/api/capsters',
    [authJwt.verifyToken],
    controller.getCapsters
  )

  app.delete(
    '/api/capsters/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCapster
  )
};
