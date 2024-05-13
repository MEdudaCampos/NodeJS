const http = require('node:http')
const PORT = 3333

const server = http.createServer((request, response)=>{
    const urlInfo = require('url').parse(request.url, true)
    const name = urlInfo.query.name

    response.statusCode= 200
    response.setHeader('Content-Type', 'text/html')

    if(!name){
        response.end('<h1>Preencha seu nome: <h1/> <form method="GET"> <input       type="text" name="name> <input type="submit" value="enviar"><input/><form/>')
    }
    else{
        response.end(`<h1>Seja bem vindo ${name}<h1/>`)
    }
})
server.listen(PORT, ()=>{
    console.log(`Servidor on ${PORT}`)
})