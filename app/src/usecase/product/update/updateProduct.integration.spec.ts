// dependências
import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/productFactory";
import UpdateProductUseCase from "./updateProductUseCase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/productModel";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/productRepository";

// definindo as props de entrada da factory
const productProps = {
  name: "Product A",
  price: 1,
  type: "a",
};

// criando o product
const product = ProductFactory.create(productProps);

// definindo os dados de input do usecase
const input = {
  id: product.id,
  name: "Product A Updated",
  price: 5,
};

// suíte de testes do usecase, sem integração
describe("Unit test for product update use case", () => {
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

  // se um registro for atualizado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should update a product", async () => {
    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // iniciando o usecase
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    // criando no db utilizando os métodos do usecase
    const output = await productUpdateUseCase.execute(input);

    // comparando-se os dados
    expect(output).toEqual(input);
  });
});
