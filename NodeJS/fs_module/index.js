const fs = require('node:fs')
const http = require('node:http')


const server = http.createServer((request, response)=>{
    fs.readFile('index.html', (err, data)=>{
        if(err){
            throw new Error('Erro ao ler o arquivo')
        }
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write(data)
    })
})

server.listen(3333, ()=>{
    console.log('Servidor on PORT 3333')
})