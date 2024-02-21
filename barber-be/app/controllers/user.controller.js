const { add } = require("date-fns");

const db = require('../models');
const User = db.user;
const Role = db.role;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Role
    });
    res.status(200).send(users.map(user => {
      const authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        freezeExpiryDate: user.freezeExpiryDate,
        roles: authorities,
      }
    }))
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.freezeUser = async (req, res) => {
  try {
    const today = new Date()
    const freezeExpiryDate = add(today, { days: 30 })
    await User.update({ freezeExpiryDate }, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).send({
      message: `User is successfully frozen until: ${freezeExpiryDate.toISOString()}`
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send({
      message: 'User is successfully deleted'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}
