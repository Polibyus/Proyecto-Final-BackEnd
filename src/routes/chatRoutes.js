const ChatModel = require('../models/chat');

function getChat(req, res) {
    ChatModel.find({})
        .then((data) => {
            res.render('chat.pug', { mensajes: data, mod: req.user.mod })
        })
        .catch((err) => {
            console.log(err)
        });
}

function vaciarChat(req, res) {
    ChatModel.deleteMany({})
        .then(() => {
            res.redirect('chat')
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports = {
    getChat,
    vaciarChat
}