import http from 'node:http'
import fs, { fdatasync } from 'node:fs'
import {createServer}from 'node:http'
import { url } from 'node:inspector'


const PORT = 7777

const server = createServer((request, response)=>{
    const { method, url } = request

    if(method === 'GET' && url.startsWith('/usuarios')){
        fs.readFile('usuarios.json', 'utf-8', (err, usuarios) =>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
                return;
            }
            response.writeHead(200,{'Content-Type':'application/json'})
            response.end(JSON.stringify(usuarios))
        })
    }else if(method === 'POST' && url === '/usuarios/'){
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk
        })
        request.on('end',()=>{
            if(!body){
                response.writeHead(400,{'Content-Type':'appplication/json'})
                response.end(JSON.stringify({message:'Corpo da solicitação vazio'}))
                return
            }
            const novoUsuario = JSON.parse(body)
            
            
            fs.readFile('usuarios.json', 'utf-8',(err,usuarios)=>{
                if(err){
                    response.writeHead(500 ,{"Content-Type":"application/json"})
                    response.end(JSON.stringify({message:"Erro ao ler receita"}))
                    return
                }
                novoUsuario.id = usuarios.length + 1
                usuarios.push(novoUsuario)
                

                fs.writeFile('usuarios.json', JSON.stringify(usuarios,null, 2), ()=>{
                    if(err){
                        response.writeHead(500,{'Content-Type':'application/json'})
                        response.end((JSON.stringify({message:'Erro a ler dados da receita'})))
                    }
                    response.writeHead(201,{'Content-Type':'application/json'})
                        response.end(JSON.stringify(novoUsuario))
                })
            }) 
            
        })
        response.end()
    
    }else if(method === 'POST' && url.startsWith('/perfil/imagem/')){
        //botar img
    }else if(method === 'POST' && url.startsWith('/login')){

    }else if(method === 'GET' && url.startsWith('/perfil/')){
        //id do user
    }else if(method === 'PUT' && url.startsWith('/perfil/')){
        //atualizar o perfil
    }






















    
})



server.listen(PORT, ()=>{
    console.log(`Servidor on PORT:${PORT}🤓☝️`)
})