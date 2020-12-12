const chat = document.getElementById('chat');
const userInput = prompt('seu nome:') // document.querySelector('input[name=username]'); 
const messageInput = document.querySelector('#chat input'); 
const containerMessage = document.querySelector('.Messages');

const open = document.getElementById('sideBar');
const cont = document.querySelector('.container');
const painel = document.querySelector('.tableLeft');
const close = document.getElementById('sideBarClose');

close.addEventListener('click', () => {
    cont.classList.remove('show');
    cont.style.pointerEvents = 'auto';
    painel.style.left = '-500px';
})

open.addEventListener('click', () => {
    cont.classList.add('show');
    cont.style.pointerEvents = 'none';
    painel.style.left = '0px';
})

const open1 = document.getElementById('nameUser');
const painel1 = document.querySelector('.tableRight');
const close1 = document.querySelector('#sideBarClose1');

close1.addEventListener('click', () => {
    cont.classList.remove('show');
    cont.style.pointerEvents = 'auto';
    painel1.style.height = '230px';
    painel1.style.width = '230px';
    painel1.style.opacity = '0';
})

open1.addEventListener('click', () => {
    cont.classList.add('show');
    cont.style.pointerEvents = 'none';
    painel1.style.height = '260px';
    painel1.style.width = '260px';
    painel1.style.opacity = '1';
})

var socket = io('https://web-chat-app-v01.herokuapp.com/')

function renderMessage(message) {
	messageObj = document.createElement('div');

	console.log(name)
	if (message.author == userInput) {
		messageObj.classList.add('Message')
		messageObj.classList.add('Your')
	} else {
		messageObj.classList.add('Message')
		messageObj.classList.add('Their')
	}
	
	messageObj.innerHTML = `<p><span class='nick'>${message.author}</span> ${message.message}</p>`	
	containerMessage.appendChild(messageObj);
}

// socket.on('previousMessages', function(messages) {
// 	for (message of messages) {
// 		renderMessage(message);
// 	}
// })

socket.on('receivedMessage', function(message) {
	renderMessage(message)
})

chat.addEventListener('submit', function(event) {
	event.preventDefault();

	var author = userInput;
	var message = messageInput.value;

	if (author.length && message.length) {
		var messageObject = {
			author: author,
			message: message,
		};

		renderMessage(messageObject);

		socket.emit('sendMessage', messageObject);
	}

	containerMessage.scrollTop = containerMessage.scrollHeight - containerMessage.clientHeight;
	messageInput.value = "";
})