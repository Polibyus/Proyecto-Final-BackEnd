const socket = io.connect();

function render(m) {
    const messages = document.querySelector('#messages');
    const html = `<div class="msg left-msg">
    <div class="msg-img" style="background-image: url(https://i.pinimg.com/564x/3b/b7/46/3bb746efe9e3f38f946f31db4dd1dba5.jpg)"></div>
    <div class="msg-bubble">
        <div class="msg-info">
            <div class="msg-info-name">${m.nick}</div>
            <div class="msg-info-time">hora</div>
        </div>
        <div class="msg-text">${m.mensaje}</div>
    </div>
    </div>`;
    messages.insertAdjacentHTML("beforeend", html);
}

function sendMsg(e) {
    const text = document.getElementById('msg').value
    socket.emit('text', text);
    document.getElementById('msg').value = '';
    return false;
}

socket.on('message', data => {
    render(data);
})