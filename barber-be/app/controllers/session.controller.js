const db = require("../models");
const Session = db.session;

exports.addSession = async (req, res) => {
  try {
    await Session.create({
      time: req.body.time,
    });
    res.status(200).send({
      message: "Session is successfully added.",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      return res.status(404).send({ message: "session Not found." });
    }
    await Session.update(
      {
        time: req.body.time,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      message: `Session is successfully updated.`,
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const session = await Session.findAll();
    res.status(200).send(session);
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      return res.status(404).send({ message: "Session Not found." });
    }
    await Session.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: "Session is successfully deleted",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};
