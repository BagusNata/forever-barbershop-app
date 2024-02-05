module.exports = (sequelize, Sequelize) => {
  const Testimonies = sequelize.define("testimonies", {
    date: {
      type: Sequelize.DATE,
    },
    rating: {
      type: Sequelize.TINYINT,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Testimonies;
};
