let socket;

socket = io.connect('http://localhost:3000/');
socket.on('mouse', function(data){
    console.log(data)
})