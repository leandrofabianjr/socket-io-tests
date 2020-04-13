var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/chat', (req, res) => res.sendFile(__dirname + '/chat.html'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', function(socket){
    console.log('Um usuário conectado');
    socket.on('disconnect', function(){
        console.log('Usuário desconectado');
    });
    socket.on('chat message', function(msg){
        console.log('mensagem: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
  console.log('Ouvindo na porta 3000');
});
