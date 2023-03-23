// dependências
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/productB";
import FindProductUseCase from "./findProductUseCase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/productModel";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";

// suíte de testes do usecase, sem integração
describe("Unit Test find product use case", () => {
  // inicializando a variável do orm
  let sequelize: Sequelize;

  // ações que ocorrem antes de cada teste
  beforeEach(async () => {
    // configurando o orm
    sequelize = new Sequelize({
      dialect: "sqlite", // definindo o db
      storage: ":memory:", // definindo que irá gravar em memória
      logging: false, // sem login
      sync: { force: true }, // criar as tabelas ao inicializar o db
    });
    // adicionando as models a serem consideradas na criação das tabelas
    await sequelize.addModels([ProductModel]);
    // criando o db
    await sequelize.sync();
  });

  // ações que ocorrem após de cada teste
  afterEach(async () => {
    // encerrando o db
    await sequelize.close();
  });

  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a product", async () => {
    // criando o product
    const product = new Product("123", "Product 1", 25.0);

    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // iniciando o usecase
    const usecase = new FindProductUseCase(productRepository);

    // definindo os dados de input
    const input = {
      id: "123",
    };

    // definindo o formato dos output esperado
    const output = {
      id: "123",
      name: "Product 1",
      price: 25.0,
    };

    // consultando no db utilizando os métodos do usecase
    const result = await usecase.execute(input);

    // comparando-se os dados
    expect(result).toEqual(output);
  });

  // se for executada uma busca por id sem sucesso, deve-se retornar mensagem de erro
  it("should not find a product", async () => {
    // iniciando o repository
    const productRepository = new ProductRepository();

    // iniciando o usecase
    const usecase = new FindProductUseCase(productRepository);

    // definindo os dados de input
    const input = {
      id: "123",
    };

    // comparando-se os dados
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });

  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a product B", async () => {
    // criando o product
    const productB = new ProductB("456", "Product B", 5.0);

    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(productB);

    // iniciando o usecase
    const usecase = new FindProductUseCase(productRepository);

    // definindo os dados de input
    const input = {
      id: "456",
    };

    // definindo o formato dos output esperado
    const output = {
      id: "456",
      name: "Product B",
      price: 10.0,
    };

    // consultando no db utilizando os métodos do usecase
    const result = await usecase.execute(input);

    // comparando-se os dados
    expect(result).toEqual(output);
  });
});
