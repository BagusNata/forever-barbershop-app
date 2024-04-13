require("dotenv").config();
const cors = require("cors");
var bcrypt = require("bcryptjs");

const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:8081",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("../app/models");
const Role = db.role;
const User = db.user;
const Capster = db.capster;
const Service = db.service;
const Session = db.session;
const Testimony = db.testimony;

async function initial() {
  try {
    // create roles
    await Role.create({
      id: 1,
      name: "user",
    });
    await Role.create({
      id: 2,
      name: "admin",
    });

    // create users
    const userAdmin = await User.create({
      username: "admin",
      email: "rizkyjaya800@gmail.com",
      phone: "082147076324",
      password: bcrypt.hashSync("#admin123", 8),
      freezeExpiryDate: null,
    });
    userAdmin.setRoles([2]);
    const customer = await User.bulkCreate([
      {
        username: "Bagus Nata",
        email: "bagusnata330@gmail.com",
        phone: "081237083255",
        password: bcrypt.hashSync("123", 8),
        freezeExpiryDate: null,
      },
      {
        username: "Vedanta",
        email: "vedanta1097@gmail.com",
        phone: "082144559897",
        password: bcrypt.hashSync("123", 8),
        freezeExpiryDate: null,
      },
    ]);
    await Promise.all(customer.map((c) => c.setRoles([1])));

    // create capsters
    await Capster.bulkCreate([
      {
        name: "Rizky",
        placeOfBirth: "Mojokerto",
        dateOfBirth: "1998-12-29 00:00:00",
        gender: "M",
      },
      {
        name: "Gunawan",
        placeOfBirth: "Denpasar",
        dateOfBirth: "1995-10-11 00:00:00",
        gender: "M",
      },
      {
        name: "Fajar",
        placeOfBirth: "Jakarta",
        dateOfBirth: "2000-01-21 00:00:00",
        gender: "M",
      },
    ]);

    // create services
    await Service.bulkCreate([
      {
        image:
          "https://t3.ftcdn.net/jpg/02/06/60/64/240_F_206606441_ZUmECkVNkChMXABKKfoOgZKpLxU8xioN.jpg",
        name: "Basic Cut",
        price: 35000,
        description:
          "Paket layanan yang paling sederhana, cocok untuk anda yang ingin tampil fresh dan ganteng dengan harga murah.",
        detail: "Hair cut, Styling",
      },
      {
        image:
          "https://t3.ftcdn.net/jpg/01/35/35/32/240_F_135353252_KrrqfRsbhgSggJXwu6APWUaXKhO8jYFu.jpg",
        name: "King Cut",
        price: 45000,
        description:
          "Paket layanan ini cocok untuk anda yang ingin auto ganteng karena sudah paket komplit.",
        detail: "Hair cut, Hair wash, Styling",
      },
      {
        image:
          "https://t4.ftcdn.net/jpg/06/12/26/03/240_F_612260300_EyhFl0IeDXeuCfKyhj1FSlnLZJwJGmdp.jpg",
        name: "Hair Color Black",
        price: 80000,
        description:
          "Paket layanan ini cocok untuk anda yang ingin menghitamkan kembali rambut agar tampak lebih fresh.",
        detail: "Hair color, Hair wash, Styling",
      },
      {
        image:
          "https://t4.ftcdn.net/jpg/05/44/14/27/240_F_544142710_QYdNnNiBoWipmf6TW2ROvslg3eijwUXs.jpg",
        name: "Hair Perming",
        price: 250000,
        description:
          "Paket layanan ini cocok untuk anda yang ingin mengubah gaya rambut, dari yang walnya lurus menjadi curly.",
        detail: "Hair perm, Hair wash, Styling",
      },
      {
        image:
          "https://t3.ftcdn.net/jpg/05/44/14/26/240_F_544142647_ZuTggOytc8iqBwXj2hp7Np6z06YO3cAg.jpg",
        name: "Korean Perm",
        price: 120000,
        description:
          "Paket layanan ini cocok untuk anda yang ingin membuat rambut agar memiliki korean look.",
        detail: "Korean perm, Hair wash, Styling",
      },
      {
        image:
          "https://t4.ftcdn.net/jpg/05/44/14/25/240_F_544142539_6vsoj5g9qLS0X2fF8CIkqFnm9z6dxjDX.jpg",
        name: "Hair Keratin",
        price: 300000,
        description:
          "Paket layanan ini cocok untuk anda yang ingin menutrisi rambut sehingga lebih sehat, mudah diatur, dan lurus natural.",
        detail: "Hair perm, Hair wash, Styling",
      },
      {
        image:
          "https://t3.ftcdn.net/jpg/04/29/53/84/240_F_429538476_23kZ81sKA6CHwax4ID1K7bKFHJb0ecWX.jpg",
        name: "Hair Spa",
        price: 45000,
        description:
          "Paket layanan ini cocok untuk anda yang ingin merasakan relaksasi dan memanjakan rambut dengan treatment hair spa.",
      },
    ]);

    // create session
    await Session.bulkCreate([
      {
        time: 10,
      },
      {
        time: 11,
      },
      {
        time: 12,
      },
      {
        time: 13,
      },
      {
        time: 15,
      },
      {
        time: 16,
      },
      {
        time: 17,
      },
      {
        time: 18,
      },
      {
        time: 19,
      },
      {
        time: 20,
      },
      {
        time: 21,
      },
    ]);

    // create testimony
    const testimony1 = await Testimony.create({
      date: "2024-1-3 18:30:48",
      rating: 5,
      description: "Kerennnn barbershopnya bersih, capsternya rapi dan ramah",
    });
    await customer[0].addTestimony(testimony1);
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// `force: true` will reset the database everytime we run server.js
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to barber application." });
});

// routes
require("../app/routes/auth.routes")(app);
require("../app/routes/user.routes")(app);
require("../app/routes/capster.routes")(app);
require("../app/routes/service.routes")(app);
require("../app/routes/session.routes")(app);
require("../app/routes/booking.routes")(app);
require("../app/routes/testimony.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
