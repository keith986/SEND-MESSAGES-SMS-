const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));

app.listen('5050', () => {
    console.log('Listening to port 5050');
});

app.get('/', (req,res) => {
res.render('index');
});

app.post('/', (req,res) => {
    const {phone,bdy} = req.body;

    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    return client.messages.create({
        to : phone,
        from : process.env.TWILIO_PHONE_NUMBER,
        body : bdy
    });
});

