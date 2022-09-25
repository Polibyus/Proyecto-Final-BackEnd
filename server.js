// Dependencias
const express = require('express');
const cookie = require("cookie");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Config
const { MONGO_URI } = require('./src/config/globals');
const { TIEMPO_EXPIRACION } = require('./src/config/globals');
const { PORT } = require('./src/config/globals');
const { EMAIL_TEST } = require('./src/config/globals');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// Utils
const { validatePass } = require('./src/utils/passValidator');
const { createHash } = require('./src/utils/hashGenerator');
// Rutas
const cartRoutes = require('./src/routes/cartRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const indexRoutes = require('./src/routes/indexRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
// Models
const UserModel = require('./src/models/usuarios');
const ChatModel = require('./src/models/chat');
// App
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
// Creacion de session
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
// App config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Views
app.set('views', './src/views');
app.set('view engine', 'pug');
// Public
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
// Passport login y signup
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
                password: createHash(password),
                mod: req.body.mod
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

// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------

//  INDEX
app.get('/', indexRoutes.getRoot);
// ----------------------------------------USER----------------------------------
//  LOGIN
app.get('/login', userRoutes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), userRoutes.postLogin);
app.get('/faillogin', userRoutes.getFaillogin);
//  SIGNUP
app.get('/signup', userRoutes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), userRoutes.postSignup);
app.get('/failsignup', userRoutes.getFailsignup);
//  LOGOUT
app.get('/logout', userRoutes.getLogout);
// ------------------------------------------------------------------------------
// PRODUCTS
app.get('/productos', indexRoutes.checkAuthentication, productRoutes.getProductos);
app.get('/item/:id', indexRoutes.checkAuthentication, productRoutes.getItem);
app.get('/nuevoProducto', indexRoutes.checkAuthentication, productRoutes.getIngresar);
app.post('/nuevoProducto', indexRoutes.checkAuthentication, productRoutes.postItem);
app.get('/delete/:id', indexRoutes.checkAuthentication, productRoutes.deleteItem);
app.get('/update/:id', indexRoutes.checkAuthentication, productRoutes.getUpdate);
app.post('/update', indexRoutes.checkAuthentication, productRoutes.postUpdate);

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
            if (err) {
                console.log(err);
            }
            io.emit('message', chatID);
        })
    })
})
app.get('/chat', indexRoutes.checkAuthentication, chatRoutes.getChat);
app.get('/vaciarchat', indexRoutes.checkAuthentication, chatRoutes.vaciarChat)

// CART
app.get('/addtocart/:id', cartRoutes.addToCart);
app.get('/cart', cartRoutes.getCart);
app.post('/checkout', cartRoutes.postCart);
app.get('/deletefromcart/:id', cartRoutes.deleteFromCart);
app.get('/reduceone/:id', cartRoutes.reduceOne);

// ERROR
app.get('*', indexRoutes.failRoute);
app.get('/item/*', indexRoutes.failRoute);

// Server escuchando
httpServer.listen(PORT, err => {
    if (err) throw new Error(`error en el sv ${err}`)
    console.log(`el sv escucha en ${PORT} en http://localhost:${PORT}`);
})
