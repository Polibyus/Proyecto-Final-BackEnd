// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------
const productos = require('../utils/fakerProducts')

function getRoot(req, res) {
    res.render('main.pug')
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username;
        res.render('index.pug', { user: user })
    } else {
        res.render('login.pug');
    }
}

function getSignup(req, res) {
    res.render('signup.pug');
}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username;
        res.render('index.pug', { user: user })
    } else {
        res.redirect('login')
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username;
        res.render('index.pug', { user: user })
    } else {
        res.redirect('login')
    }
}

function getFaillogin (req, res) {
    res.render('login.pug', { error: true });
}

function getFailsignup (req, res) {
    res.render('signup.pug', { error: true });
}

function getProductos(req, res) {
    res.render('productos.pug', { productos: productos });
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            res.render('main.pug');
        } 
    });
}

function failRoute(req, res){
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
    getProductos
}
  