module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("services", {
    image: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },
    detail: {
      type: Sequelize.STRING,
    },
  });

  return Service;
};
