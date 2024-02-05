const db = require('../models');
const Capster = db.capster;
const GENDERS = db.GENDERS;

exports.addCapster = async (req, res) => {
  try {
    if (!GENDERS.includes(req.body.gender)) {
      return res.status(400).send({
        message: `Failed! Gender ${req.body.gender} does not exist.`
      });
    }
    await Capster.create({
      name: req.body.name,
      placeOfBirth: req.body.placeOfBirth,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender
    })
    res.status(200).send({
      message: 'Capster is successfully added.'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.updateCapster = async (req, res) => {
  try {
    const capster = await Capster.findByPk(req.params.id)
    if (!capster) {
      return res.status(404).send({ message: 'Capster Not found.' });
    }
    await Capster.update({
      name: req.body.name,
      placeOfBirth: req.body.placeOfBirth,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender
    }, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).send({
      message: `Capster ${capster.name} is successfully updated.`
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.getCapsters = async (req, res) => {
  try {
    const capsters = await Capster.findAll()
    res.status(200).send(capsters)
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}

exports.deleteCapster = async (req, res) => {
  try {
    const capster = await Capster.findByPk(req.params.id)
    if (!capster) {
      return res.status(404).send({ message: 'Capster Not found.' });
    }
    await Capster.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send({
      message: 'Capster is successfully deleted'
    })
  } catch {
    res.status(500).send({
      message: 'Sorry, something went wrong on our end. Please try again later.'
    });
  }
}
