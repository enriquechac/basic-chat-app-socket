const socket = io();


let message = document.getElementById('txt-input');
let output = document.getElementById('message-container');
let form = document.getElementById('form-user');
let form_username = document.getElementById('form-username');


let btn_entrar = document.getElementById('entrar');
let btn_enviar = document.getElementById('send-input');

let UsernameID = '';


btn_entrar.addEventListener('click', function () {  
    if(form_username.value.length>0){
        UsernameID = form_username.value;
        socket.emit('chat:join', {
            username: UsernameID,
        });
        let chatElement= document.createElement('div');
        chatElement.classList.add('message-alert');
        chatElement.innerHTML = '<p>' + UsernameID + ' entro al chat</p>';
        output.insertBefore(chatElement, output.firstChild);
        form.classList.add('hidden');
    }
})

document.addEventListener('keyup', (event) => {

    if(event.key == 'Enter' && message.value.length > 0 && message == document.activeElement){
    
        socket.emit('chat:message', {
            username: UsernameID,
            message: message.value,
        });
        let chatElement= document.createElement('div');
        chatElement.classList.add('message');
        chatElement.classList.add('right');
        chatElement.innerHTML = '<p class="username">'+ UsernameID +'</p><p class="message-content">'+ message.value +'</p>';
        output.insertBefore(chatElement, output.firstChild);
        message.value="";
        
    }
    
  }, false);

btn_enviar.addEventListener('click', function () {
    if(message.value.length>0){
        socket.emit('chat:message', {
            username: UsernameID,
            message: message.value,
        });
        let chatElement= document.createElement('div');
        chatElement.classList.add('message');
        chatElement.classList.add('right');
        chatElement.innerHTML = '<p class="username">'+ UsernameID +'</p><p class="message-content">'+ message.value +'</p>';
        output.insertBefore(chatElement, output.firstChild)
        message.value="";
    }
    //console.log('Enviado');
});

socket.on('server:chat:message', function (data) {
    let chatElement= document.createElement('div');
    chatElement.classList.add('message');
    chatElement.classList.add('left');
    chatElement.innerHTML = '<p class="username">' + data.username + '</p><p class="message-content">' + data.message + '</p>';
    output.insertBefore(chatElement, output.firstChild)
});

socket.on('server:chat:join', function (data) {
    let chatElement= document.createElement('div');
    chatElement.classList.add('message-alert');
    chatElement.innerHTML = '<p>' + data.username + ' entro al chat</p>';
    output.insertBefore(chatElement, output.firstChild)
});

