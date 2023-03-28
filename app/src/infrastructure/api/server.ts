// arquivo de configuração do servidor da api
// dependências
import { app } from "./express";
import dotenv from "dotenv";

// obtendo as variáveis de ambiente
dotenv.config();

//configurando a parta a partir do ambiente ou usa 3000 como default
const port: number = Number(process.env.PORT) || 3000;

// iniciando o servidor
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
