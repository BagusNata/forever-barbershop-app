module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("bookings", {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    isDone: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  });

  return Booking;
};
