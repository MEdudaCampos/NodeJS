import fs from 'node:fs'

// const AtualizarFuncionario = (callback)=>({
//     fs.readFile('funcionarios.json', 'utf8', (err, data)=>{
//         if(err){
//             response.writeHead(500, { 'Content-Type':'application/json'});
//             response.end(JSON.stringify({ message: 'Erro ao ler o arquivo'}))
//         }
//         const jsonData = JSON.parse(data)
//         const indexFuncionario = jsonData.findIndex((funcionario)=> funcionario.id === id)
    
//         if(indexFuncionario === -1){
//             response.writeHead(404,{'Content-Type':'application/json'})
//             response.end(JSON.stringify({ message: 'Funcionário não encontrado'}))
//         })
// })

const AtualizarFuncionario = (callback)=>{
    fs.readFile('funcionarios.json', 'utf8', ()=>{
        if(err){
            callback(err)
        }
        try{
            const jsonData = JSON.parse(data)
            const indexFuncionario = jsonData.findIndex((funcionario)=> funcionario.id === id)
            if(indexFuncionario === -1){
                callback(err)
            }
            
            
        }catch(error){
            callback(error)
        }
    })
}

export default AtualizarFuncionario