const jwt = require("jsonwebtoken");
const { setHours } = require("date-fns");
const db = require("../models");
const Op = db.Sequelize.Op;
const config = require("../config/auth.config.js");
const Booking = db.booking;
const User = db.user;
const Service = db.service;
const Session = db.session;

exports.addBooking = async (req, res) => {
  try {
    // create new booking
    const newBooking = await Booking.create({
      date: req.body.date,
      isDone: false,
    });

    // add user and service to the booking
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    await Promise.all([
      newBooking.setUser(decoded.id),
      newBooking.setService(req.body.serviceId),
      newBooking.setSession(req.body.sessionId),
    ]);

    res.status(200).send({
      message: "Booking is successfully created",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.doneBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: "Booking Not found." });
    }
    await Booking.update(
      { isDone: true },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      message: "Booking is successfully completed",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        isDone: false,
        date: {
          [Op.gte]: new Date(),
        },
      },
      include: [
        {
          model: Service,
          attributes: ["id", "image", "name", "price", "description", "detail"],
        },
        {
          model: Session,
          attributes: ["id", "time"],
        },
        { model: User, attributes: ["id", "username", "email"] },
      ],
    });
    res.status(200).send(bookings);
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    // get current user from token
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);

    // get bookings of current user
    const bookings = await Booking.findAll({
      where: {
        isDone: false,
        date: {
          [Op.gte]: new Date(),
        },
        userId: decoded.id,
      },
      include: [
        {
          model: Service,
          attributes: ["id", "image", "name", "price", "description", "detail"],
        },
        {
          model: Session,
          attributes: ["id", "time"],
        },
        { model: User, attributes: ["id", "username", "email"] },
      ],
    });
    res.status(200).send(bookings);
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.getMyBookingsTime = async (req, res) => {
  try {
    // get current user from token
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);

    // get all bookings from date in range from 00:00 to 23:00 of current user
    const bookings = await Booking.findAll({
      where: {
        isDone: false,
        date: {
          [Op.gte]: setHours(new Date(req.body.date), 0),
          [Op.lte]: setHours(new Date(req.body.date), 23),
        },
        userId: decoded.id,
      },
    });
    // return array of time e.g. [16,17,18,18,19]
    const bookingTime = bookings.map((book) => book.time);
    res.status(200).send(bookingTime);
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: "Booking Not found." });
    }
    await Booking.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: "Booking is successfully deleted",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};
