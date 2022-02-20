const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();
let MongoClient = require("mongodb").MongoClient;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        extended: true,
        limit: "50mb",
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use("/api/users", users);
require("./config/passport")(passport);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = require("./config/keys").mongoURI;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(
                `Server Running on Port: http://localhost:${PORT}, Database Connected.`
            )
        )
    )
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);