module.exports = (sequelize, Sequelize) => {
  const Testimonies = sequelize.define("testimonies", {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    rating: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Testimonies;
};
