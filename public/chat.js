const chat = document.getElementById('chat');
var userInput;//prompt('seu nome:') // document.querySelector('input[name=username]'); 
const messageInput = document.querySelector('#chat input'); 
const containerMessage = document.querySelector('.Messages');

const open = document.getElementById('sideBar');
const cont = document.querySelector('.container');
const painel = document.querySelector('.tableLeft');
const close = document.getElementById('sideBarClose');
const imgProfile = document.getElementById('imgProfile');
const btnUpdateName = document.getElementById('usernameBtn');
const form = document.querySelector('.tableRight form')

window.onload = genIcon();

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
const input1 = document.querySelector('.tableRight input')

btnUpdateName.addEventListener('click', () => {
	if (input1.value) { 
    	cont.classList.remove('show');
    	cont.style.pointerEvents = 'auto';
		painel1.style.opacity = '0';

		userInput = input1.value;
	}
})

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input1.value) { 
    	cont.classList.remove('show');
    	cont.style.pointerEvents = 'auto';
		painel1.style.opacity = '0';
	}
})

close1.addEventListener('click', () => {
	if (input1.value) { 
    	cont.classList.remove('show');
    	cont.style.pointerEvents = 'auto';
		painel1.style.opacity = '0';
	}
})

open1.addEventListener('click', () => {
    cont.classList.add('show');
    cont.style.pointerEvents = 'none';
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

function genIcon() {
	letters = 'abcdefghijklmnopqrstuvwxyz0123456789'; //36
	seed = '';
	for(i=0; i < 8; i++) {
		gen = letters[Math.floor(Math.random() * 35)]
		seed += gen
	}

	url = `https://avatars.dicebear.com/4.5/api/gridy/:${seed}.svg?&background=%237f5af0&m=5`
	imgProfile.src = url;
}