const { authJwt } = require("../middleware");
const controller = require("../controllers/session.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/sessions",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addSession
  );

  app.put(
    "/api/sessions/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateSession
  );

  app.get("/api/sessions", controller.getSessions);

  app.delete(
    "/api/sessions/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteSession
  );
};
