const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = require('./router'); 

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

// Load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use('/route', router); 

// Home route
app.get('/', (req, res) => {
    res.render('base', { title: "LOGIN SYSTEM" });
    
});

app.listen(port, () => {
    console.log(`Listening to the server on http://localhost:${port}`);
});
