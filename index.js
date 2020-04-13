var app = require('express')();
var socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

app.get('/chat', (req, res) => res.sendFile(__dirname + '/chat.html'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

const server = app.listen(PORT, function(){
  console.log('Ouvindo na porta ' + PORT);
});

const io = socketIO(server);

io.on('connection', function(socket){
    console.log('Um usuário conectado');
    socket.on('disconnect', function(){
        console.log('Usuário desconectado');
    });
    socket.on('chat message', function(msg){
        console.log('uuid: ' + msg.authorId);
        console.log('mensagem: ' + msg.message);
        io.emit('chat message', msg);
    });
});