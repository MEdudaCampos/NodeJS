import fs from 'node:fs'

const lerDadosFuncionarios = (callback) => {
    fs.readFile('funcionarios.json', 'utf8', ()=>{
        if(err){
            callback(err)
        }
        try{
            const funcionario = JSON.parse(data)
            callback(null, funcionario)
        } catch(error){
            callback(error)
        }
    })
}
export default lerDadosFuncionarios