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
        console.log('uuid: ' + msg.authorId);
        console.log('mensagem: ' + msg.message);
        io.emit('chat message', msg);
    });
});

const port = process.env.NODE_ENV === 'production' ? 443 : 3000;
http.listen(port, function(){
  console.log('Ouvindo na porta ' + port);
});
