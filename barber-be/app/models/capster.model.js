module.exports = (sequelize, Sequelize) => {
  const Capster = sequelize.define("capsters", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    placeOfBirth: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Capster;
};
