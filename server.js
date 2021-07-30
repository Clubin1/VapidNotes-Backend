const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport')
const fs = require('fs')
const Loan = require('./models/Loan')
const users = require('./routes/api/users')
const app = express()
let MongoClient = require('mongodb').MongoClient;

const {cloudinary} = require('./utils/cloudinary')
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    extended:true,
    limit: '50mb'
}));
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Routes
app.use('/api/users', users)


app.post("/settings/upload/image", async (req,res) => {
    try {
        const fileStr = req.body.data
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups'
        })
        console.log(uploadedResponse)
        let url = uploadedResponse.secure_url
        res.json({data: url})
    } catch (error) {
        console.error('asdfasdf')
        res.status(500).json({err: error})
    }
})
// Port
const PORT = process.env.PORT || 5000;

// Database Condig
const CONNECTION_URL = require('./config/keys').mongoURI

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}, Database Connected.`))).catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);