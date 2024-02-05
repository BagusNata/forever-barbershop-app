require('dotenv').config();
const express = require('express');
const cors = require('cors');
var bcrypt = require('bcryptjs');

const app = express();

var corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:8081', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;
const User = db.user;
const Capster = db.capster;
const Service = db.service;
const Booking = db.booking;
const Testimony = db.testimony;

async function initial() {
  // create roles
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "admin",
  });

  // create users
  const customer = await User.create({
    username: "user1",
    email: "user1@barber.com",
    password: bcrypt.hashSync("123456", 8),
    freezeExpiryDate: null,
  });
  customer.setRoles([1]);
  const userAdmin = await User.create({
    username: "admin",
    email: "admin@barber.com",
    password: bcrypt.hashSync("123456", 8),
    freezeExpiryDate: null,
  });
  userAdmin.setRoles([2]);

  // create capsters
  Capster.create({
    name: "Rizky",
    placeOfBirth: "Mojokerto",
    dateOfBirth: "1998-12-29 00:00:00",
    gender: "M",
  });
  Capster.create({
    name: "Gunawan",
    placeOfBirth: "Denpasar",
    dateOfBirth: "1995-10-11 00:00:00",
    gender: "M",
  });
  Capster.create({
    name: "Fajar",
    placeOfBirth: "Jakarta",
    dateOfBirth: "2000-01-21 00:00:00",
    gender: "M",
  });

  // create services
  const basicCut = await Service.create({
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.explicit.bing.net%2Fth%3Fid%3DOIP.FatE4JVDWdHv4DdoZKlS9gHaE7%26pid%3DApi&f=1&ipt=c9de38f860d20e9abf034da909f9d679b9d575f24cea103413f1c2c7ed6897ca&ipo=images",
    name: "Basic Cut",
    price: 35000,
    description:
      "Paket layanan yang paling sederhana, cocok untuk kamu yang ingin tampil fresh dan ganteng dengan harga murah.",
    detail: "Hair cut, Styling",
  });
  Service.create({
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.hAmLi7WCl7XPkzvMgV2-hgHaGf%26pid%3DApi&f=1&ipt=e71d3285ca19afe44b46f6c2993f6036388d9fe77fe91c0bc11072b92ee15389&ipo=images",
    name: "King Cut",
    price: 45000,
    description:
      "Paket layanan ini cocok untuk kamu yang ingin auto ganteng karena sudah paket komplit.",
    detail: "Hair cut, Hair wash, Styling",
  });
  Service.create({
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Vb38kD5cvROjppdMtKZHzQHaGM%26pid%3DApi&f=1&ipt=d876d36c8a9395f84374de4af6405f9ca82efc2f3afba920d35928a3c605d05e&ipo=images",
    name: "Hair Color",
    price: 100000,
    description:
      "Paket layanan ini cocok untuk kamu yang ingin mewarnai rambut agar tampak lebih fresh.",
    detail: "Hair color, Hair wash, Styling"
  });
  Service.create({
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.BQ0jXn8pn7GJuwutk9r2mAHaGZ%26pid%3DApi&f=1&ipt=aa9e9c399fa84cc25a1d8d552d53a657f28974967e8fa61f439f1e4bc3bf8862&ipo=images",
    name: "Hair Perming",
    price: 250000,
    description: "Paket layanan ini cocok untuk kamu yang ingin tampil beda.",
    detail: "Hair Perming, Hair wash, Styling",
  });

  // create bookings
  const booking1 = await Booking.create({
    date: "2023-12-30 01:39:48",
    time: 19,
    isDone: false,
  });
  customer.addBooking(booking1);
  basicCut.addBooking(booking1);

  // create testimony
  const testimony1 = await Testimony.create({
    date: "2024-1-3 18:30:48",
    rating: 5,
    description: "Kerennnn barbershopnya bersih, capsternya rapi dan ramah",
  });
  customer.addTestimony(testimony1);
}


// `force: true` will reset the database everytime we run server.js
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to barber application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/capster.routes')(app);
require('./app/routes/service.routes')(app);
require('./app/routes/booking.routes')(app);
require('./app/routes/testimony.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
