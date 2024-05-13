import fs from 'node:fs' 

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

const escreverFuncionario = (callback)=>{
    fs.writeFile('funcionarios.json', (err)=>{
        if(err){
            callback(err)
            
        }try{
            JSON.stringify(jsonData, null, 2)
        }catch(error){
            callback(error)
        }
    })
}

export default escreverFuncionario