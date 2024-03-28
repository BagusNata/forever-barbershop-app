module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("services", {
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detail: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Service;
};
