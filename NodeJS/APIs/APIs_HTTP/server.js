import http, { request } from 'node:http'

const PORT = 3333 

const users = []
const server = http.createServer((request, response)=>{
    const {method, url} = request
    if(url === '/users' && method === "GET"){//Buscar todos os usuários
      response.setHeader('Content-Type', 'application/json')  // devolve a resposta quando pedido a resquisição
      response.end(JSON.stringify(users)) /// vai converter todas as informações em json
    
    }else if(url.startsWith('/users/') && method === 'GET'){//Buscar um único usuário
        const userId = url.split('/')[2]
        const user = users.find((user)=> user.id == userId)

        if(user){
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(user))
        }else{
            response.writeHead(401, {'Content-Type':'application/json'})
            response.end(JSON.stringify({mensage: 'Usuário não encontrado'}))
        }
    }else if(url === '/users' && method === "POST"){ //cadastrar um usuário
    let body = ''
    request.on('data', (chunk)=>{ // isso é um evento, ela vai pegar os pedaços
        // body += 'id:User, email:email' // o node reconhece como pedaçp = chunk   node puro
        body += chunk.toString()
    })
    request.on('end', ()=>{  
    const novoUsuario = JSON.parse(body)// vai passar a ser JSON
    novoUsuario.id = users.length + 1
    users.push(novoUsuario)
    response.writeHead(201, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(novoUsuario))
    })
    }else if(url.startsWith('/users/') && method === 'PUT'){ //atualizarar um usuário
        const userId = url.split('/')[2];

        let body = '';
    request.on('data', (chunk)=>{ 
        body += chunk.toString()
    });

    request.on('end', ()=>{
        const updateUser = JSON.parse(body)
        const index = users.findIndex((user)=> user.id == userId)
        if(index !== -1){
            //atualizar
            users[index] = {...users[index], updateUser}
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(users[index]))
        }else{
            //retornar um erro
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.end({mensage: 'Erro ao tentar atualizar Usuário'})
        }
    })
        
    }else if(url.startsWith('/users/') && method === 'DELETE'){//Deletar um usuáior
        const userId = url.split('/')[2];
        const index = users.findIndex((user)=> user.id == userId);
        if(index !== -1){
            users.splice(index, 1)
            response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({mensage: 'Usuário excluido'}))
        }
        
        
    }else{ //recurso não encontrado
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({mensage: 'Páginas não encontrada'}))

    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT}`)
})