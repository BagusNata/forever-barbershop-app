module.exports = (sequelize, Sequelize) => {
  const Capster = sequelize.define('capsters', {
    name: {
      type: Sequelize.STRING
    },
    placeOfBirth: {
      type: Sequelize.STRING
    },
    dateOfBirth: {
      type: Sequelize.DATE
    },
    gender: {
      type: Sequelize.STRING
    }
  });

  return Capster;
};
