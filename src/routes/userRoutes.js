const { createTransport } = require('nodemailer');
const TEST_MAIL = 'sharon27@ethereal.email'
// Node Mailer
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'GAcB95KP2BhVw7tQbC'
    }
});

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.cookie('username', req.user.username)
        res.render('index.pug', { user: {username: req.user.username, mod: req.user.mod} })
    } else {
        res.render('login.pug');
    }
}

function getSignup(req, res) {
    res.render('signup.pug');
}

function postLogin(req, res) {
    if (req.isAuthenticated()) {
        res.cookie('username', req.user.username)
        res.render('index.pug', { user: {username: req.user.username, mod: req.user.mod} })
    } else {
        res.redirect('login')
    }
}

async function postSignup(req, res) {
    if (req.isAuthenticated()) {
        res.cookie('username', req.user.username)
        const mailOptions = {
            from: 'Shop of Roll',
            to: req.user.email,
            subject: 'Se ha creado una cuenta en Shop of Roll',
            html: `<h1>Bienvenido ${req.body.firstName} a Shop of roll</h1>
            <p>Su usuario es: ${req.user.username}</p>
            <p>Por favor, no pierda su contraseña y espero que disfrute comprar en nuestra pagina</p>`
        }
        try {
            const info = await transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(err)
        }
        res.render('index.pug', { user: {username: req.user.username, mod: req.user.mod} })
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

function getLogout(req, res) {
    req.logout((err) => {
        if (!err) {
            res.render('main.pug');
        }
        req.session.destroy();
    });
}

module.exports = {
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    getSignup,
    postSignup,
    getFailsignup
}