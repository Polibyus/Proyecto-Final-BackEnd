const ProductModel = require('../models/productos');

function getProductos(req, res) {
    ProductModel.find({})
        .then((data) => {
            res.render('productos.pug', { productos: data, mod: req.user.mod });
        })
        .catch((err) => {
            console.log(err)
        })
}

function getItem(req, res) {
    ProductModel.findById(req.params.id)
        .then((data) => {
            res.render('item.pug', { item: data, mod: req.user.mod });
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
            res.render('nuevoProducto.pug', { msg: 'Error al crear producto', mod: req.user.mod  })
        }
        res.render('nuevoProducto.pug', { msg: 'Producto cargado correctamente', mod: req.user.mod  })
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
            res.render('actProducto.pug', { item: data, mod: req.user.mod  });
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

function getIngresar(req, res) {
    res.render('nuevoProducto.pug', {mod: req.user.mod} );
}

module.exports = {
    getProductos,
    getItem,
    getIngresar,
    postItem,
    deleteItem,
    getUpdate,
    postUpdate
}
