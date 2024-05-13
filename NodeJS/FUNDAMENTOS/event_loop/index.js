function a(){
    console.log('Execute a função a()')
}
function b(){
    console.log('Execute a função b()')
}
function c(){
    console.log('Execute a função c()')
    a()
    b()
}

a()
b()
c()