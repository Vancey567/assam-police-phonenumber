import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import path from "path";
import { dirname, join } from "path";
const pathToMiddlwares = dirname("./middlwares");
const pathToControllers = dirname("./controllers");

// DB
import connectToDB from "./db.js";

// Routes
import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to DB
connectToDB();

app.use(express.static(join(pathToMiddlwares, "public")));

// Serve controller files
app.use(
  "/@controller",
  express.static(path.join(pathToControllers, "/server/controllers"))
);

// Serve middleware files
app.use(
  "/@middleware",
  express.static(path.join(pathToMiddlwares, "/server/middleware"))
);

const MongoStoreInstance = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  ttl: 24 * 60 * 60, // 24hr
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStoreInstance,
  })
);

app.use(cors());
app.use(passport.authenticate("session"));

app.use(express.json());
app.use("/", routes);

// Custom 404 page
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server listening on ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
