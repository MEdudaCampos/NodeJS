const http = require('node:http')
const PORT = 5555

const server = http.createServer((request, response)=>{
    if(request.url === '/'){
        response.writeHead(200, {'Content-Type': 'text/plan'
        })
        response.end('Página Incial')

    }else if(request.url === '/sobre'){
        response.url(200, {'Content-Type': 'text/plan'})
        response.end('Página Sobre')
    }else{
        response.writeHead(200, {'Content-Type': 'text/plan'
        })
        response.end('Página Não Encontrada')
    }
})

server.listen(3333, () => {
     console.log('Servidor on PORT:'+PORT+'🤓')
})