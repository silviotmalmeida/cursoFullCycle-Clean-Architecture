// dependências
import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/productFactory";
import ListProductUseCase from "./listProductUseCase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/productModel";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";

// definindo as props de entrada da factory
const productProps1 = {
  name: "Product A",
  price: 1,
  type: "a",
};
const productProps2 = {
  name: "Product B",
  price: 2,
  type: "b",
};

// criando os products
const product1 = ProductFactory.create(productProps1);
const product2 = ProductFactory.create(productProps2);

// definindo os dados de input do usecase
const input = {};

// suíte de testes do usecase, sem integração
describe("Unit test for listing product use case", () => {
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

  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should list a product", async () => {
    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

    // iniciando o usecase
    const useCase = new ListProductUseCase(productRepository);

    // buscando no db utilizando os métodos do usecase
    const output = await useCase.execute(input);

    // comparando-se os dados
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
