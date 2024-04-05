const { authJwt } = require("../middleware");
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/bookings", [authJwt.verifyToken], controller.addBooking);

  app.post(
    "/api/bookings/:id/done",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.doneBooking
  );

  app.get(
    "/api/bookings",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getBookings
  );

  app.get("/api/bookings/me", [authJwt.verifyToken], controller.getMyBookings);

  app.post("/api/bookings/time", controller.getBookingsTime);

  app.delete(
    "/api/bookings/:id",
    [authJwt.verifyToken],
    controller.deleteBooking
  );
};
