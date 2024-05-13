
import http from 'node:http'
import fs, { fdatasync } from 'node:fs'

const PORT = 5555


const server = http.createServer((request, response)=>{
    const { method, url } = request
    

    fs.readFile('./receitas.json', 'utf-8', (err, data)=>{
        if(err){
            response.writeHead(500, {'Content-Type': 'application/json'})
            response.end({message: 'Erro interno'})
            return
        }
        let jsonData = []
        try{
            jsonData = JSON.parse(data)
        }catch(error) {
            console.log(error)
        }
    })
   


    if(method === 'GET' && url === "/receitas"){
        fs.readFile('receitas.json', 'utf-8', (err) =>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
                return;
            }
            response.writeHead(200,{'Content-Type':'application/json'})
            response.end(JSON.stringify(receitas))
        })
    }else if(method === 'POST' && url === '/receitas/'){
        let body = ''
        response.on('data', (chunk) =>{
            body += chunk.toString()
        })
        response.on('end', ()=>{
            const novaReceita = JSON.parse(body)
            novaReceita.id = jsonData.length + 1
            jsonData.push(novaReceita)

            fs.writeFile("receitas.json", JSON.stringify(jsonData, null, 2), (err) =>{
                if(err){
                    if(err) {
                    response.writeHead(500, {'Content-Type':'application/json'})
                    response.end(JSON.stringify({message:'Erro interno no Servidor'}))
                    return;
                    }

                }
                response.writeHead(201, { "Content-Type": "application/json" });
                response.end(JSON.stringify(novaReceita));
            }) 
       })
    }else if(method === 'PUT' && url === '/receitas/' ){
        //id
    }else if(method === 'GET' && url === '/receitas/'){
        //id
    }else if(method === 'GET' && url === '/ingredientes'){

    }else if(method === 'GET' && url === '/buscas'){
        
    }else if(method === 'GET' && url === '/categorias'){

    }else if(method === 'DELETE' && url === '/receitas/'){
    }

})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT:${PORT}🤓☝️`)
})