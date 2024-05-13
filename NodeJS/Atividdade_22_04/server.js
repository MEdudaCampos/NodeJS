import http from 'node:http'
import fs, { fdatasync } from 'node:fs'
import {URLSearchParams} from 'node:url'
import lerDadosFuncionarios from './funcionarios.js'
import AtualizarFuncionario from './AtualizarFunciornarios.js'
import escreverFuncionario from './escreverFuncionario.js'

const PORT = 3333




const server = http.createServer((request,response)=>{
   const { method, url}= request

    response.setHeader('Acess-Control-Allow-Origin', '*')
    response.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.setHeader('Acess-Control-Allow-Headers', 'Content-Type')

   
    if(method === 'GET' && url === '/empregados'){
        lerDadosFuncionarios((err, funcionarios)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
            }
            response.writeHead(200,{'Content-Type':'application/json'})
            response.end(JSON.stringify(funcionarios))
        })
    }else if(method === 'GET' && url === '/empregados/count'){
        lerDadosFuncionarios((err)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
                const jsonData = JSON.parse(data)
                const totalFuncionario = json.length
                response.writeHead(200, {'Content-Type':'application/json'})
                response.end(JSON.stringify(totalFuncionario))
            }
        })
        // fs.readFile('funcionarios.json','utf8', (err)=>{
        //     if(err){
        //         response.writeHead(500, {'Content-Type':'application/json'})
        //         response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
        //     const jsonData = JSON.parse(data)
        //     const totalFuncionario = json.length 

        //     response.writeHead(200,{'Content-Type':'application/json'})
        //     response.end(JSON.stringify({message:`total de funionarios: ${totalFuncionario}`}))
        //     } 
        // })
    }else if(method === 'GET' && url.startsWith( '/empregados/porHabilidade/')){
        const habilidade = url.split('/')[3]
        lerDadosFuncionarios((err)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
            }
            const jsonData = JSON.parse(data)
            const funcinariosPorHabilidade = jsonData.filter(
                (funcionario)=> funcionario.habilidade.includes(habilidade)
            );
            if(funcinariosPorHabilidade.length === 0){
                response.writeHead(404, { 'Content-Type':'application/json'});
                response.end(JSON.stringify({ message: 'Não existe funcionario com essa habilidade'}))
            }
        })
        response.end()
        // fs.readFile('funcionarios.json', 'utf8', (err, data)=>{
        //     if(err){
        //         response.writeHead(500, { 'Content-Type':'application/json'});
        //         response.end(JSON.stringify({ message: 'Erro ao ler o arquivo'}))
        //     }
        
    }else if(method === 'GET' && url.startsWith('/empregados/porCargo/')){
        const cargo = url.split('/')[3]
        
            // if(err){
            //     response.writeHead(500, { 'Content-Type':'application/json'});
            //     response.end(JSON.stringify({ message: 'Erro ao ler o arquivo'}))
            // }
            lerDadosFuncionarios((err)=>{
                if(err){
                    response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
                }
                const jsonData = JSON.parse(data)
                const funcinariosPorCargo = jsonData.filter((funcionario) => funcionario.cargo === cargo);
    
                if(funcinariosPorCargo.length === 0){
                    response.writeHead(404,{'Content-Type':'application/json'})
                    response.end(JSON.stringify({ message: 'Funcionário não encontrado'}))
                    return
                }
                response.writeHead(200,{'Content-Type':'application/json'})
                response.end(JSON.stringify(funcinariosPorCargo))
            })
        response.end()
    }else if(method === 'GET' && url === '/empregados/porFaixaSalarial' ){
        const urlParams = new URLSearchParams(url.split('?')[1])
        const minSalario = urlParams.get('minSalario')
        const maxSalario = urlParams.get('maxSalario')
        
        // fs.readFile('funcionarios.json', 'utf8', (err, data)=>{
        //     if(err){
        //         response.writeHead(500, { 'Content-Type':'application/json'});
        //         response.end(JSON.stringify({ message: 'Erro ao ler o arquivo'}))
        //     }
            lerDadosFuncionarios((err)=>{
                if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
                }
                const jsonData = JSON.parse(data)

                const funcionarioPorFaixaSalarial = jsonData.filter(
                    (funcionario)=> funcionario.salario >= minSalario && funcionario.salario <= maxSalario
                )
                if(funcionarioPorFaixaSalarial.length === 0){
                    response.writeHead(404, { 'Content-Type':'application/json'});
                    response.end(JSON.stringify({ message: 'Não existe funcionario com essa Faixa Salarial'}))
                    return;
                }
                response.writeHead(200, { 'Content-Type':'application/json'});
                response.end(JSON.stringify(funcionarioPorFaixaSalarial))
            }) 
    }else if(method === 'GET' && url.startsWith('/empregados/')){
        const id = parseInt(url.split('/')[2])
        //localhost:empregados/3
    //    fs.readFile('funcionarios.json', 'utf8', (err)=>{
    //     if(err){
    //         response.writeHead(500, {'Content-Type':'application/json'})
    //         response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
    //     }

        lerDadosFuncionarios((err)=>{
            if(err){
                response.writeHead(500, {'Content-Type':'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler o arquivo'}))
                }
                const jsonData = JSON.parse(data)

                const indexFuncionario = jsonData.findIndex((funcionario)=>funcionario.id === id)
        
                if(indexFuncionario === -1){
                    response.writeHead(404, {'Content-Type':'application/json'})
                    response.end(JSON.stringify({message: 'Funcionário não encontrado'}))
                }
        })
        response.end()        
        response.writeHead(200,{'Content-Type':'application/json'})
        response.end(JSON.stringify(jsonData))
    }else if(method === 'POST' && url === '/empregados/'){
       let body = ''
       response.on('data', (chunk) =>{
        body += chunk
       })
       response.on('end', ()=>{
        const novoFuncionario = JSON.parse(body)
        novoFuncionario.id= jsonData.length + 1
        jsonData.push(novoFuncionario)
        
        fs.writeFile("funcinarios.json", JSON.stringify(novoFuncionario, null, 2), (err) =>{})
        if(err){
            if(err) {
                response.writeHead(500, {'Content-Type':'application/json'})
                response,end(JSON({message:'Erro interno no Servidor'}))
                return
            }
        }
        })
    }else if(method === 'PUT' && url.startsWith('/empregados/')){
        const id = parseInt(url.split('/')[2])
        
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk
        })
        request.on('end', ()=>{
                AtualizarFuncionario((err)=>{
                    if(err){
                    response.writeHead(500, { 'Content-Type':'application/json'});
                    response.end(JSON.stringify({ message: 'Erro ao ler o arquivo'}))
                    }
                    response.writeHead(404,{'Content-Type':'application/json'})
                    response.end(JSON.stringify({ message: 'Funcionário não encontrado'}))
                })
                

            // fs.readFile('funcionarios.json', 'utf8', (err, data)=>{
            //     if(err){
            //         response.writeHead(500, { 'Content-Type':'application/json'});
            //         response.end(JSON.stringify({ message: 'Erro ao ler o arquivo'}))
            //     }
            //     const jsonData = JSON.parse(data)
            //     const indexFuncionario = jsonData.findIndex((funcionario)=> funcionario.id === id)

            //     if(indexFuncionario === -1){
            //         response.writeHead(404,{'Content-Type':'application/json'})
            //         response.end(JSON.stringify({ message: 'Funcionário não encontrado'}))
            //     }
                const funcionarioAtualizado = JSON.parse(body)
                funcionarioAtualizado.id = id

                jsonData[indexFuncionario] = funcionarioAtualizado


                escreverFuncionario((err)=>{
                    if(err){
                        response.writeHead(500, { 'Content-Type':'application/json'});
                        response.end(JSON.stringify({ message: 'Erro ao salvar os dados no Banco de dados'}))
                        return;
                    }
                    response.writeHead(200,{'Content-Type':'application/json'})
                    response.end(JSON.stringify(funcionarioAtualizado))
                })

                // fs.writeFile('funcionarios.json', JSON.stringify(jsonData, null, 2), (err)=>{
                //     if(err){
                //         response.writeHead(500, { 'Content-Type':'application/json'});
                //         response.end(JSON.stringify({ message: 'Erro ao salvar os dados no Banco de dados'}
                //         ))
                //         return;
                //     }
                //     response.writeHead(200,{'Content-Type':'application/json'})
                //     response.end(JSON.stringify(funcionarioAtualizado))

                // })
            })
        


    }else if(method === 'DELETE' && url.startsWith('/empregados/')){
        const id = url.split('/')[2]
        fs.writeFile('funcionarios.json', JSON.stringify(jsonData, null, 2), (err)=>{
            if(err){
                response.writeHead(500, { 'Content-Type':'application/json'});
                response.end(JSON.stringify({ message: 'Erro ao ler arquivos'}
                ))
                }
            })
    }else{
        response.writeHead(404, {'Content-Type':'application'});
        response.end(JSON.stringify({message: "Não encontrado"}))
    }
   })


server.listen(PORT, ()=>{
    console.log(`Servidor on PORT:${PORT}🤓☝️`)
})