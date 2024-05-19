if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path');
const http = require('http'); 
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport-config');

const server = http.createServer(app); 
const io = require('socket.io')(server); 

const usersChat = {};

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id),
);

const users = [];


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {

    res.render('index.ejs', { user: req.user });
});


app.get('/login', (req, res) => {

    res.render('login', {message: { }})
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.get('/basic', (req, res) => {
    res.render('basic',  { user: req.user })
});

app.get('/advance', (req, res) => {
    res.render('advance',  { user: req.user })
});

app.get('/full', (req, res) => {
    res.render('full',  { user: req.user })
});

app.get('/game', (req, res) => {
    res.render('game',  { user: req.user })
});

app.get('/chat', (req, res) => {
    res.render('chat')
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

app.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // Update this line
        users.push({
            id: Date.now().toString(),
            name:req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// io.on('connection', socket => {
//     console.log('A user connected');

//     socket.join('chat');

//     socket.to('chat').emit('user-connected', 'New user connected');

//     socket.on('send-chat-message', message => {
//         io.to('chat').broadcast.emit('chat-message', { message: message, name: usersChat[socket.id] });
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//         const disconnectedUser = usersChat[socket.id];
//         delete usersChat[socket.id];
//         socket.to('chat').broadcast.emit('user-disconnected', disconnectedUser);
//     });
// });
