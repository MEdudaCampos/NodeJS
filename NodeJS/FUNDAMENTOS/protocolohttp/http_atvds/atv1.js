const http = require('node:http')
const PORT = 5555

const server = http.createServer((request, response)=>{

    if(request.url === '/'){
        response.writeHead(200, {'Content-Type': 'text/plan'
        })
        response.end('<h1>Bem-vido à página inicial<h1/>')

    }else if(request.url === '/sobre'){
        response.url(200, {'Content-Type': 'text/plan'})
        response.end('<h1>Sobre nós: somos uma empresa dedicada a...<h1/>')
    }else{
        response.writeHead(200, {'Content-Type': 'text/plan'
        })
        response.end('Página Não Encontrada')
    }
})

server.listen(5555, () => {
     console.log('Servidor on PORT:'+PORT+'🤓')
})