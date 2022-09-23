const socket = io.connect();
const form = document.querySelector("form");
const input = document.querySelector(".msger-input");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    socket.emit('text', input.value);
    input.value = "";
    return false;
}, false);

function render(m) {
    console.log(m);
    const html = `
    <div class="msg left-msg">
        <div class="msg-img" style="background-image: url(https://i.pinimg.com/564x/3b/b7/46/3bb746efe9e3f38f946f31db4dd1dba5.jpg)"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${m.nick}</div>
                <div class="msg-info-time">${m.date.getHours()}:${m.date.getMinutes()}</div>
            </div>
            <div class="msg-text">${m.mensaje}</div>
        </div>
    </div>`;
    document.getElementById('messages').innerHTML = html;
}


socket.on('message', (data) => {
    console.log(data);
    render(data)
});