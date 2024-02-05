module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define('bookings', {
    date: {
      type: Sequelize.DATE
    },
    time: {
      type: Sequelize.TINYINT
    },
    isDone: {
      type: Sequelize.BOOLEAN
    },
  });

  return Booking;
};
