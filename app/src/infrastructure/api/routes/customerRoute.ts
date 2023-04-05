// dependências
import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/createCustomerUseCase";
import ListCustomerUseCase from "../../../usecase/customer/list/listCustomerUseCase";
import CustomerRepository from "../../customer/repository/sequelize/customerRepository";
import CustomerPresenter from "../presenters/customerPresenter";

// inicializando o gerenciador de rotas
export const customerRoute = express.Router();

// configurando a rota / do post, para criação
customerRoute.post("/", async (req: Request, res: Response) => {
  // inicializando o caso de uso de criação
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  // tratamento de exceções
  try {
    // obtendo os dados de input para caso de uso a partir do request
    const input = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
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
customerRoute.get("/", async (req: Request, res: Response) => {
  // inicializando o caso de uso de busca geral
  const usecase = new ListCustomerUseCase(new CustomerRepository());

  // tratamento de exceções
  try {
    // input do caso de uso
    const input = {};

    // executando o caso de uso
    const output = await usecase.execute(input);

    // enviando os dados de retorno como response
    res.format({
      // se o formato no header da resuisição for json
      json: async () => res.send(output),
      // se o formato no header da resuisição for xml
      xml: async () => res.send(CustomerPresenter.listXML(output)),
    });
  } catch (err) {
    // em caso de erro, retorna código 500
    res.status(500).send(err);
  }
});
