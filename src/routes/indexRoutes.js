function getRoot(req, res) {
    if (req.isAuthenticated()) {
        res.cookie('username', req.user.username)
        res.render('index.pug', { user: { username: req.user.username, mod: req.user.mod } })
    } else {
        res.render('main.pug')
    }
}

function failRoute(req, res) {
    res.render('error.pug');
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("login");
    }
}

function checkIfMod(req, res, next) {
    if (req.user.mod) {
        next();
    } else {
        req.session.destroy();
        res.render('main.pug', { msg: 'No esta autorizado' });
    }
}

module.exports = {
    getRoot,
    failRoute,
    checkAuthentication,
    checkIfMod
}
