const express = require('express')
const cookie = require("cookie")
const session = require('express-session')
const routes = require('./src/routes/routes')
const UserModel = require('./src/models/usuarios');
const ChatModel = require('./src/models/chat');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { MONGO_URI } = require('./src/config/globals');
const { TIEMPO_EXPIRACION } = require('./src/config/globals')
const { validatePass } = require('./src/utils/passValidator');
const { createHash } = require('./src/utils/hashGenerator')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { PORT } = require('./src/config/globals')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: advancedOptions
    }),
    secret: 'JuanchiFP',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.set('views', './src/views');
app.set('view engine', 'pug');
//public
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())


passport.use('login', new LocalStrategy(
    (username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (!user) {
                return callback(null, false)
            }

            if (!validatePass(user, password)) {
                return callback(null, false)
            }
            return callback(null, user)
        })
    }
))


passport.use('signup', new LocalStrategy(
    { passReqToCallback: true }, (req, username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }
            if (user) {
                return callback(null, false)
            }
            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: username,
                password: createHash(password)
            }
            UserModel.create(newUser, (err, userWithId) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, userWithId)
            })
        })
    }
))

passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    UserModel.findById(id, callback)
})


//  INDEX
app.get('/', routes.getRoot);

//  LOGIN
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
app.get('/faillogin', routes.getFaillogin);

//  SIGNUP
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//  LOGOUT
app.get('/logout', routes.getLogout);

// PRODUCTS
app.get('/productos', routes.checkAuthentication, routes.getProductos);
app.get('/item/:id', routes.getItem);
app.get('/nuevoProducto', routes.getIngresar);
app.post('/nuevoProducto', routes.postItem);
app.get('/delete/:id', routes.deleteItem);
app.get('/update/:id', routes.getUpdate);
app.post('/update', routes.postUpdate);

// CHAT
io.on('connection', (socket) => {
    socket.on('text', (data) => {
        const cookies = cookie.parse(socket.handshake.headers.cookie); 
        const newChat = {
            nick: cookies.username,
            mensaje: data,
            date: new Date()
        }
        ChatModel.create(newChat, (err, chatID) => {
            if(err){
                console.log(err);
            }
            io.emit('message', chatID);
        })
    })
})

app.get('/chat', routes.getChat);

//  FAIL ROUTE
app.get('*', routes.failRoute);
app.get('/item/*', routes.failRoute);

httpServer.listen(PORT, err => {
    if (err) throw new Error(`error en el sv ${err}`)
    console.log(`el sv escucha en ${PORT} en http://localhost:3000`);
})
