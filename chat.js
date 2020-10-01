const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


app.use('/style', express.static(__dirname + '/style'))
app.get('/',(req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket)=>{
    socket.username = 'anonymous'
    socket.on('message', (msg) => {
        console.log(msg)
        io.emit('message', {
            'user': socket.username, 'message': msg
        })
    })
    socket.on('join', (username) =>{
        if(username !=null){
            socket.username = username
        }
        socket.broadcast.emit('message', { user:'Server','message': socket.username + " Entrou no servidor!"})
    })
})

http.listen(3000, () => console.log('Conectado'))

