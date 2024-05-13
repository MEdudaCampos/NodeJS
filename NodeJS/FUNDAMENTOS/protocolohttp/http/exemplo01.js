const http = require('node:http')

const PORT = 3333 || 4444

const server = http.createServer((requeste, response)=>{
    response.writeHead(200, {'Content-Type': 'text/plan'})
    response.write('olá:(')
    response.end()
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT:${PORT}`)
})