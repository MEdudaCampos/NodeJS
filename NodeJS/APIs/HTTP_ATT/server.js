import http, { request } from 'node:http'

const PORT = 3333
const participants = []

const server = http.createServer((request, response)=>{
    const {url, method} = request
    console.log('URL: ', url)

    if(url === '/participants' && method === "GET"){
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(participants))
    }else if(url.startsWith("/participants/count") && method === "GET"){
        const quantidadeParticipant = participants.length;
        response.setHeader("Content-Type", "application/json");
        response.end(
            JSON.stringify({})
        )
    }else if(url.startsWith("/participants/count/over18") && method === "GET"){
        
    }else if(url.startsWith("/participants/city/most") && method === "GET"){
        
    }else if(url.startsWith("/participants/") && method === "GET"){
        const participantId = split('/')[2]
        const findParticipant = participants.find((participant)=>{
            return participant.id == participantId
        })
        if(!findParticipant){
            response.writeHead(404, { 'Content-Type':"application/json" })
            return response.end(JSON.stringify({ message: "Participante não encontrado"}))
            
        }
        response.setHeader( "Content-Type","application/json" )
    }
    else if(url === "/participants" && method === "POST"){
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk
        })
        request.on("end", ()=>{
            const participant = JSON.parse(body)
            if(participant.age < 16){
                response.writeHead(403, {"Content-Type": "application/json"})
                return response.end(
                    JSON.stringify( { message: "Apenas usuários maiores que 15 anos" } )
                );
            }
            if (participant.password !== participant.confirmPassword) {
                response.writeHead(400, {"Content-Type":"application/json"})
                return response.end(
                    JSON.stringify({ message: "As senhas fornacidas não correspondem"})
                )
            }
            participant.id = participants.length + 1
            participants.push(participant);
            response.writeHead(201, { 'Content-Type':"aplication/json" })

            response.end()
        })
    }else if(url.startsWith("/participants/") && method === "PUT"){
        const participantId = url.split('/')[2]

        let body = ''
        request.on("data", (chunk)=>{
            body += chunk
        })
        request.on('end',()=>{
            const UptateParticipant = JSON.parse(body)
            const index = participant.findIndex(
                (participant)=> participant.id == participantId
            )
            if(index !== -1) {
                participants[index] = {...participants[index], ...UptateParticipant}
                response.setHeader({ 'Content-Type':"application/json" })
                response.end(JSON.stringify(participantId[index]))
            }else{
                response.writeHead(404, { 'Content-Type':"application/json" })
                return response.end(
                    JSON.stringify({message: "Participantes não encontrados"})
                )
            }
        })


    }else if(url.startsWith("/participants/") && method === "DELETE"){
        const participantId = url.split('/')[2]
        const index = participants.findIndex((participants)=> {
            return participant.id == participantId
        });

    }else{
        response.writeHead(404, {'Content-Type':"aplication/json"});
        response.end(
            JSON.stringify({codigo: 404, message: "Página não encontrada"})
        )
    }
})

server.listen(PORT, ()=>{
    console.log('Servidor está ON '+PORT)
})