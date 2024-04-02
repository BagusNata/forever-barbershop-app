module.exports = (sequelize, Sequelize) => {
  const Capster = sequelize.define("capsters", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    placeOfBirth: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Capster;
};
