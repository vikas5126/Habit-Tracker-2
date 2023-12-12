const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

const passport = require('passport');
const session = require('express-session');
const passportlocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(express.static('./assests'));
app.use(expressLayouts);
app.use(cookieparser());
app.use('/uploads', express.static(__dirname+ '/uploads'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the sessions cookies in db 
app.use(session({
    name: 'codeial',

    // to do change the secret before in production mode 
    secret: 'blahsomething', 
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000*60*100)
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1:27017/habit',
        autoRemove: 'disabled',
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);

app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }

    console.log(`Server is running on port: ${port}`);
})