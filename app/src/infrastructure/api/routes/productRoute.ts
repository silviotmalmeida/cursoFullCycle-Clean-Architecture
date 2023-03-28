// dependências
import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/createProductUseCase";
import ProductRepository from "../../product/repository/sequelize/productRepository";
import ListProductUseCase from "../../../usecase/product/list/listProductUseCase";

// inicializando o gerenciador de rotas
export const productRoute = express.Router();

// configurando a rota / do post, para criação
productRoute.post("/", async (req: Request, res: Response) => {
  // inicializando o caso de uso de criação
  const usecase = new CreateProductUseCase(new ProductRepository());

  // tratamento de exceções
  try {
    // obtendo os dados de input para caso de uso a partir do request
    const input = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
    };

    // executando o caso de uso
    const output = await usecase.execute(input);

    // enviando os dados de retorno como response
    res.send(output);
  } catch (err) {
    // em caso de erro, retorna código 500
    res.status(500).send(err);
  }
});

// configurando a rota / do get, para busca geral
productRoute.get("/", async (req: Request, res: Response) => {
  // inicializando o caso de uso de busca geral
  const usecase = new ListProductUseCase(new ProductRepository());

  // tratamento de exceções
  try {
    // input do caso de uso
    const input = {};

    // executando o caso de uso
    const output = await usecase.execute(input);

    // enviando os dados de retorno como response
    res.send(output);
  } catch (err) {
    // em caso de erro, retorna código 500
    res.status(500).send(err);
  }
});
