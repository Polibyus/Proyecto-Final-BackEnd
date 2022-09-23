// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------
const ProductModel = require('../models/productos');
const ChatModel = require('../models/chat');
const io = require('socket.io');

function getRoot(req, res) {
    res.render('main.pug')
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username;
        res.cookie('username', user)
        res.render('index.pug', { user: user })
    } else {
        res.render('login.pug');
    }
}

function getSignup(req, res) {
    res.render('signup.pug');
}

function postLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username;
        res.cookie('username', user)
        res.render('index.pug', { user: user })
    } else {
        res.redirect('login')
    }
}

function postSignup(req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username;
        res.render('index.pug', { user: user })
    } else {
        res.redirect('login')
    }
}

function getFaillogin(req, res) {
    res.render('login.pug', { error: true });
}

function getFailsignup(req, res) {
    res.render('signup.pug', { error: true });
}

function getProductos(req, res) {
    ProductModel.find({})
        .then((data) => {
            res.render('productos.pug', { productos: data });
        })
        .catch((err) => {
            console.log(err)
        })
}

function getItem(req, res) {
    ProductModel.findById(req.params.id)
        .then((data) => {
            res.render('item.pug', { item: data });
        })
        .catch((err) => {
            res.status(404).render('error.pug', {});
        })
}

function postItem(req, res) {
    const newItem = {
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        description: req.body.description,
        category: req.body.category
    }
    ProductModel.create(newItem, (err, itemWithID) => {
        if (err) {
            res.render('nuevoProducto.pug', { msg: 'Error al crear producto' })
        }
        res.render('nuevoProducto.pug', { msg: 'Producto cargado correctamente' })
    })
}

function deleteItem(req, res) {
    ProductModel.deleteOne({ _id: req.params.id })
        .then(function () {
            res.redirect('/productos')
        })
        .catch(function (error) {
            res.redirect('/productos')
        });
}

function getUpdate(req, res) {
    ProductModel.findById(req.params.id)
        .then((data) => {
            res.render('actProducto.pug', { item: data });
        })
        .catch((err) => {
            console.log(`el error es: ${err}`)
        })
}

function postUpdate(req, res) {
    const item = {
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        description: req.body.description,
        category: req.body.category
    }
    ProductModel.findOneAndUpdate({ _id: req.body.id }, item)
        .then(function () {
            res.redirect('/productos')
        })
        .catch(function (error) {
            res.redirect('/productos')
        });
}

function postChat(data) {
    ChatModel.create(data, (err, chatID) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/chat')
    })
    
}

function getIngresar(req, res) {
    res.render('nuevoProducto.pug');
}

function getLogout(req, res) {
    req.logout((err) => {
        if (!err) {
            res.render('main.pug');
        }
    });
}

function failRoute(req, res) {
    res.status(404).render('error.pug', {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("login");
    }
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getProductos,
    getItem,
    getIngresar,
    postItem,
    deleteItem,
    getUpdate,
    postUpdate,
    postChat
}
