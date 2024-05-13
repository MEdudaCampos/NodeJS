import {createServer}from 'node:http'
import fs from 'node:fs'
import {URLSearchParams} from 'node:url'

import lerDadosReceitas from './lerReceitas.js'
const PORT = 5555 // buscar informações do servidor


const server = createServer((request, response)=>{
     const {method, url} = request  
     // criar rotas
     if(method === "GET" && url === '/receitas'){ // listar
       // fs.readFile('aqui esta o arquivp.json','utf8', callback)
       lerDadosReceitas((err, receitas)=>{
        if(err){
            response.writeHead(500,{"Content-Type":"application/json"})
            response.end(JSON.stringify({message:"Erro ao ler os dados das receitas"}))
        }
            response.writeHead(200,{"Content-Type":"application/json"})
            response.end(JSON.stringify(receitas))
          
       });
     }else if (method === "POST" && url === '/receitas'){ //Cadastrar
        let body = ''
        request.on('data', (chunk )=>{
            body += chunk
        })
        request.on('end',()=>{
            if(!body){
                response.writeHead(400,{'Content-Type':'appplication/json'})
                response.end(JSON.stringify({message:'Corpo da solicitação vazio'}))
                return
            }
            const novaReceita = JSON.parse(body)
            lerDadosReceitas((err,receitas)=>{
                if(err){
                    response.writeHead(500 ,{"Content-Type":"application/json"})
                    response.end(JSON.stringify({message:"Erro ao ler receita"}))
                    return
                }
                novaReceita.id = receitas.length + 1
                receitas.push(novaReceita)

                fs.writeFile('receitas.json', JSON.stringify(receitas,null, 2), ()=>{
                    if(err){
                        response.writeHead(500,{'Content-Type':'application/json'})
                        response.end((JSON.stringify({message:'Erro a ler dados da receita'})))
                    }
                    response.writeHead(201,{'Content-Type':'application/json'})
                        response.end(JSON.stringify(novaReceita))
                })
            })
        
            
        })
     }else if (method === "PUT" && url.startsWith('/receitas/')){ // atualizar
        const id = parseInt(url.split('/')[2])
        let body = ''
        request.on('data',(chunk)=>{
            body += chunk
        })
        request.on('end',()=>{
            if(!body){
                response.writeHead(400, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message:'Corpo da solicitação vazio'}))
                return
            }
            lerDadosReceitas((err, receitas)=>{
                if(err){
                    response.writeHead(500,{'Content-Type':'application/json'})
                    response.end(JSON.stringify({message:'Erro a ler dados da receita'}))
                    return
                }
                const indexReceita = receitas.findIndex((receita)=>receita.id === id)
                if(indexReceita === -1){
                    response.writeHead(404, {'Content-Type':'application/json'})
                    response.end(JSON.stringify({message:'Receita não encontrada'}))
                    return
                }
                const receitaAtualizada = JSON.parse(body)
                receitaAtualizada.id = id
                receitas[indexReceita] = receitaAtualizada

                fs.writeFile('receitas.json', JSON.stringify(receitas, null, 2), (err)=>{
                    if(err){
                    response.writeHead(500,{'Content-Type':'application/json'})
                    response.end(JSON.stringify({message:'Não é possivel atualizar a Receita'}))
                    return
                    }
                    response.writeHead(201,{'Content-Type':'application/json'})
                    response.end(JSON.stringify(receitaAtualizada))
                })
            })
            

            
        })
     }else if (method === "DELETE" && url.startsWith('/receitas/')){// deletar
        const id = parseInt(url.split('/')[2])

        lerDadosReceitas((err, receitas)=>{
            if(err){
                response.writeHead(500,{'Content-Type':'application/json'})
                response.end(JSON.stringify({message:'Erro ao ler dados da receitas'}))
                return
            }
            const indexReceita = receitas.findIndex((receita)=>receita.id === id)
            if(indexReceita === -1){
                response.writeHead(404, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message:'Receita não encontrada'}))
                return
            }
            
            receitas.splice(indexReceita, 1)

            fs.writeFile("receitas.json", JSON.stringify(receitas, null, 2), (err)=>{
                if(err){
                    response.writeHead(500,{'Content-Type':'application/json'})
                    response.end(JSON.stringify({message:'Erro a deletar da receita no Banco de Dados'}))
                    return
                }
                response.writeHead(200,{'Content-Type':'application/json'})
                response.end(JSON.stringify({message:'Receita excluída'}))
            })
        })
     }else if (method === "GET" && url.startsWith('/receitas/')){// Listar Uma Receita
        response.end(method)
     }else if (method === "GET" && url.startsWith('/categorias/')){
        //localhost:3333/categorias/saladas
        response.end(method)
     }else if (method === "GET" && url.startsWith('/busca')){// Buscar por Receita
         //localhost:3333/busca?termo=Pratos%20Principais

        const urlParam = new URLSearchParams(url.split('?')[1])
        const termo = urlParam.get('termo')

        lerDadosReceitas((err, receitas)=>{
            if(err){
                response.writeHead(500,{'Content-Type':'application/json'})
                response.end(JSON.stringify({message:'Erro a ler dados da receita'}))
                return
            }

            const resultadoBusca = receitas.filter((receita)=> receita.nome.includes(termo) || receita.categoria.includes(termo) || receita.ingredientes.some((ingrediente.includes(termo))))

            if(resultadoBusca.length === 0){
                response.writeHead(404,{'Content-Type':'application/json'})
                response.end(JSON.stringify({message:`Não foi encontrada receita com o termo: ${termo}`}))
                return
            }
            response.writeHead(200,{'Content-Type':'application/json'})
            response.end(JSON.stringify(resultadoBusca))
        })





        response.end(method)
     }else if (method === "GET" && url.startsWith('/ingredientes')){ // listar todos os ingredientes
        //localhost:3333/ingredientes


       response.end(method)
    }else{
        response.writeHead(404,{'Content-Type':'application/json'})
        response.end(JSON.stringify({message:'Rota não encontrada'}))
    }
})
//é funca
server.listen(PORT,()=>{
    console.log(`Servidor on PORT: ${PORT}🤓☝️`)
})
