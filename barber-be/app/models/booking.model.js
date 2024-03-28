module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("bookings", {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
    isDone: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  });

  return Booking;
};
