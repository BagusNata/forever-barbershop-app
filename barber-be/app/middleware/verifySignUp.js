const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmailOrPhone = async (req, res, next) => {
  try {
    // Check Username
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    // Check Email
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    // Check Phone
    user = await User.findOne({
      where: {
        phone: req.body.phone,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Failed! Phone is already in use!",
      });
    }

    next();
  } catch (error) {
    console.error("Error in checkDuplicateUsernameOrEmailOrPhone:", error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmailOrPhone: checkDuplicateUsernameOrEmailOrPhone,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
