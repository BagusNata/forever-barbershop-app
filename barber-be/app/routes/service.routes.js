const { authJwt } = require('../middleware');
const controller = require('../controllers/service.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    "/api/services",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addService
  );

  app.put(
    "/api/services/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateService
  );

  app.get(
    "/api/services",
    controller.getServices
  );

  app.delete(
    "/api/services/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteService
  );
};
