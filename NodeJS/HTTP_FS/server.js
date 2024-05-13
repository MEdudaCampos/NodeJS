import http from "http";
import fs from "fs";

const PORT = 3333;

const server = http.createServer((request, response) => {
  const { url, method } = request;

  fs.readFile("livros.json", "utf8", (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Erro interno do servidor" }));
      return;
    }

    let jsonData = [];
    try {
      jsonData = JSON.parse(data);
    } catch (error) {
      console.error("Erro ao analisar JSON:", error);
    }

    if (url === "/livros" && method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(jsonData));
    } else if (url === "/livros" && method === "POST") {
     
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        const newItem = JSON.parse(body);
        newItem.id = jsonData.length + 1; // Gerar um novo ID
        jsonData.push(newItem);
        fs.writeFile(
          "livros.json",
          JSON.stringify(jsonData, null, 2),
          (err) => {
            if (err) {
              response.writeHead(500, { "Content-Type": "application/json" });
              response.end(
                JSON.stringify({ message: "Erro interno do servidor" })
              );
              return;
            }
            response.writeHead(201, { "Content-Type": "application/json" });
            response.end(JSON.stringify(newItem));
          }
        );
      });
    } else if (url.startsWith("/livros/") && method === "PUT") {
      
      const id = parseInt(url.split("/")[2]); 
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        const updatedItem = JSON.parse(body);
        // Procurar o livro pelo ID e atualizar seus dados
        const index = jsonData.findIndex((item) => item.id === id);
        if (index !== -1) {
          jsonData[index] = { ...jsonData[index], ...updatedItem };
          fs.writeFile(
            "livros.json",
            JSON.stringify(jsonData, null, 2),
            (err) => {
              if (err) {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(
                  JSON.stringify({ message: "Erro interno do servidor" })
                );
                return;
              }
              response.writeHead(200, { "Content-Type": "application/json" });
              response.end(JSON.stringify(jsonData[index]));
            }
          );
        } else {
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Livro não encontrado" }));
        }
      });
    } else if (url.startsWith("/livros/") && method === "DELETE") {
      
      const id = parseInt(url.split("/")[2]); 
      const index = jsonData.findIndex((item) => item.id === id);
      if (index !== -1) {
        jsonData.splice(index, 1);
        fs.writeFile(
          "livros.json",
          JSON.stringify(jsonData, null, 2),
          (err) => {
            if (err) {
              response.writeHead(500, { "Content-Type": "application/json" });
              response.end(
                JSON.stringify({ message: "Erro interno do servidor" })
              );
              return;
            }
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(
              JSON.stringify({ message: "Livro removido com sucesso" })
            );
          }
        );
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Livro não encontrado" }));
      }
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor on PORT:${PORT}🚀`);
});
