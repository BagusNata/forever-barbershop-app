const { authJwt } = require('../middleware');
const controller = require('../controllers/testimony.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    "/api/testimonies",
    [authJwt.verifyToken],
    controller.addTestimony
  );

  app.get("/api/testimonies", controller.getTestimonies);

  app.delete(
    "/api/testimonies/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteTestimony
  );
};
