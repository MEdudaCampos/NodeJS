module.exports = {
    soma(a, b){
        console.log(`${a+b}`)
    },
    aoQuadrado(a){
        console.log(`${a*a}`)
    },
    subtracao(a, b){
        console.log(`${a-b}`)
    }, 
    divisao(a, b){
        console.log(`${a/b}`)
        if(b <= 0){
            console.log(`Não é possivel fazer uma divisão com ${b}`)
            return
        }
    },
    multiplicacao(a,b){
        console.log(`${a*b}`)
    }
}