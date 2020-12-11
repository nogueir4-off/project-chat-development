const chat = document.getElementById('chat');
const userInput = prompt('seu nome:') // document.querySelector('input[name=username]'); 
const messageInput = document.querySelector('#chat input'); 
const containerMessage = document.querySelector('.Messages');

// const open = document.getElementById('sideBar');
// const cont = document.querySelector('.container');
// const painel = document.querySelector('.tableLeft');
// const close = document.getElementById('sideBarClose');

// close.addEventListener('click', () => {
//     cont.classList.remove('show');
//     painel.style.left = '-500px';
// })

// open.addEventListener('click', () => {
//     cont.classList.add('show');
//     painel.style.left = '0px';
// })

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