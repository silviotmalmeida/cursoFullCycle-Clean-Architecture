// dependências
import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./createProductUseCase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/productModel";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";

// definindo os dados de input do usecase
const input = {
  name: "Product 1",
  price: 25.0,
  type: "a",
};

// suíte de testes do usecase, sem integração
describe("Unit test create product use case", () => {
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

  // se um product é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a product", async () => {
    // iniciando o repository
    const productRepository = new ProductRepository();
    // iniciando o usecase
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    // criando no db utilizando os métodos do usecase
    const output = await productCreateUseCase.execute(input);

    // comparando-se os dados
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  // se um product é criado através da factory, sem o atributo name, deve-se enviar mensagem de erro
  it("should thrown an error when name is missing", async () => {
    // iniciando o repository
    const productRepository = new ProductRepository();
    // iniciando o usecase
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    // alterando o atributo name para vazio
    input.name = "";
    // verificando a mensagem de erro
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  // se um product é criado através da factory, com price inferior ou igual a 0, deve-se enviar mensagem de erro
  it("should thrown an error when price is less than zero", async () => {
    // iniciando o repository
    const productRepository = new ProductRepository();
    // iniciando o usecase
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    // alterando o atributo name para válido
    input.name = "Product 1";
    // alterando o atributo price para zero
    input.price = 0;
    // verificando a mensagem de erro
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
