const http = require('node:http')
const fs = require('node:fs')
const users = []

const PORT = 5555

const server = http.createServer((request, response)=>{
    const {method, url} = request

    if(url === '/users' && method === "GET"){
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(users))
    }


    else if(url === "/users" && method === "POST"){
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk.toString()
        })
        request.on('end', ()=>{
            const novoUsuario = JSON.parse(body)
            novoUsuario.id = users.length + 1
            users.push(novoUsuario)
            response.writeHead(201, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(novoUsuario))
        })

    }
})

server.listen(PORT, ()=>{
    console.log('Server ON PORT:'+PORT)
})
