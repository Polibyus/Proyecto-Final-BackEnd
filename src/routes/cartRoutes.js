const Cart = require('../models/carrito')
const ProductModel = require('../models/productos');
const OrderModel = require('../models/ordenes');

function addToCart(req, res) {
    const productID = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    ProductModel.findById(productID)
        .then((product) => {
            cart.add(product, productID);
            req.session.cart = cart;
            res.redirect('/productos')
        })
        .catch((err) => {
            console.log(`el error es: ${err}`)
        })
}

function getCart(req, res) {
    const cart = req.session.cart;
    if (req.session.cart && req.session.cart.totalQty > 0) {
        res.render('cart.pug', { cart: cart, mod: req.user.mod })
    }
    else {
        res.render('cart.pug', { error: true, mod: req.user.mod })
    }
}

function reduceOne(req, res) {
    const productID = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceOne(productID);
    req.session.cart = cart;
    res.redirect('/cart')
}

function deleteFromCart(req, res) {
    const productID = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.deleteFromCart(productID);
    req.session.cart = cart;
    res.redirect('/cart')

}

function postCart(req, res) {
    if (!req.session.cart) {
        res.redirect('/cart')
    }
    const cart = new Cart(req.session.cart);
    const newOrder = {
        name: req.user.username,
        cart: cart,
        domicilio: req.body.direccion,
        metodo: req.body.metodo
    }
    OrderModel.create(newOrder, (err, orderWithID) => {
        if (err) {
            console.log(err);
            res.render('cart.pug', { msg: 'Error al comprar', error: true, mod: req.user.mod })
        }
        req.session.cart = null;
        res.render('cart.pug', { msg: 'Orden cargada correctamente', error: true, mod: req.user.mod })
    })
}

module.exports = {
    addToCart,
    getCart,
    postCart,
    reduceOne,
    deleteFromCart
}