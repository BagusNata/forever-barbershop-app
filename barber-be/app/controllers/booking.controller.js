const jwt = require("jsonwebtoken");
const { setHours } = require("date-fns");
const db = require("../models");
const Op = db.Sequelize.Op;
const config = require("../config/auth.config.js");
const Booking = db.booking;
const User = db.user;
const Service = db.service;
const Session = db.session;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

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

exports.getBookingsTime = async (req, res) => {
  try {
    // get all bookings from date in range from 00:00 to 23:00 of current user
    const bookings = await Booking.findAll({
      where: {
        isDone: false,
        date: {
          [Op.gte]: setHours(new Date(req.body.date), 0),
          [Op.lte]: setHours(new Date(req.body.date), 23),
        },
      },
    });
    res.status(200).send(bookings);
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.sendBookingMail = async (req, res) => {
  // Configure Nodemailer with your SMTP settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_HOST,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const {
    recipientEmail,
    userName,
    bookingDate,
    bookingTime,
    bookingService,
    bookingPrice,
    bookingServiceDetail,
  } = req.body;

  // Compose email
  const mailOptions = {
    from: process.env.SMTP_HOST,
    to: recipientEmail,
    subject: "Booking Confirmation",
    html: `
    <p>Dear <strong>${userName}</strong>, <br> Here are your booking details:</p>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="border: none; text-align: left; padding: 8px;">Tanggal</td>
        <td style="border: none; text-align: center;">:</td>
        <td style="border: none; text-align: left; padding: 8px;">${bookingDate}</td>
      </tr>
      <tr>
        <td style="border: none; text-align: left; padding: 8px;">Jam</td>
        <td style="border: none; text-align: center;">:</td>
        <td style="border: none; text-align: left; padding: 8px;">${bookingTime}</td>
      </tr>
      <tr>
        <td style="border: none; text-align: left; padding: 8px;">Layanan</td>
        <td style="border: none; text-align: center;">:</td>
        <td style="border: none; text-align: left; padding: 8px;">${bookingService}</td>
      </tr>
      <tr>
        <td style="border: none; text-align: left; padding: 8px;">Layanan</td>
        <td style="border: none; text-align: center;">:</td>
        <td style="border: none; text-align: left; padding: 8px;">${bookingPrice}</td>
      </tr>
      <tr>
        <td style="border: none; text-align: left; padding: 8px;">Detail Layanan</td>
        <td style="border: none; text-align: center;">:</td>
        <td style="border: none; text-align: left; padding: 8px;">${bookingServiceDetail}</td>
      </tr>
    </table>
    <p>Best Regards,<br><strong>Forever Barbershop Bali</strong></p>
  `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
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
