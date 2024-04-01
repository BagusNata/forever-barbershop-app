module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("sessions", {
    time: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
  });

  return Session;
};
