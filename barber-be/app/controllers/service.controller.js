const db = require("../models");
const Service = db.service;

exports.addService = async (req, res) => {
  try {
    await Service.create({
      image: req.body.image,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      detail: req.body.detail,
    });
    res.status(200).send({
      message: "Service is successfully added.",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).send({ message: "Service Not found." });
    }
    await Service.update(
      {
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        detail: req.body.detail,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send({
      message: `Service ${service.name} is successfully updated.`,
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).send(services);
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).send({ message: "Service Not found." });
    }
    await Service.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: "Service is successfully deleted",
    });
  } catch {
    res.status(500).send({
      message:
        "Sorry, something went wrong on our end. Please try again later.",
    });
  }
};
