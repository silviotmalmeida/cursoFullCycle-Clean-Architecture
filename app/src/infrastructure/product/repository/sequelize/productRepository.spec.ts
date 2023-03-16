// dependências
import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./productModel";
import ProductRepository from "./productRepository";

// criando a suíte de testes unitários
describe("Product repository test", () => {
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
    sequelize.addModels([ProductModel]);
    // criando o db
    await sequelize.sync();
  });

  // ações que ocorrem após de cada teste
  afterEach(async () => {
    // encerrando o db
    await sequelize.close();
  });

  // se um registro for armazenado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should create a product", async () => {
    // criando o objeto
    const product = new Product("1", "Product 1", 100);

    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // consultando no db utilizando os métodos do orm
    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    // comparando-se os dados
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  // se um registro for atualizado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should update a product", async () => {
    // criando o objeto
    const product = new Product("1", "Product 1", 100);

    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // consultando no db utilizando os métodos do orm
    let productModel = await ProductModel.findOne({ where: { id: "1" } });

    // comparando-se os dados
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    // alterando os dados
    product.changeName("Product 2");
    product.changePrice(200);

    // atualizando os dados no db utilizando os métodos do repository
    await productRepository.update(product);

    // consultando no db utilizando os métodos do orm
    productModel = await ProductModel.findOne({ where: { id: "1" } });

    // comparando-se os dados atualizados
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a product", async () => {
    // criando o objeto
    const product = new Product("1", "Product 1", 100);

    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // consultando no db utilizando os métodos do repository
    const foundProduct = await productRepository.find("1");

    // comparando-se os dados
    expect(product).toStrictEqual(foundProduct);
  });

  // se for executada uma busca por id e a mesma não retornar registros, deve-se lançar uma exceção
  it("should throw an error when product id is not found", async () => {
    // consultando no db utilizando os métodos do repository, por um registro inexistente
    const productRepository = new ProductRepository();
    expect(async () => {
      await productRepository.find("456ABC");
    }).rejects.toThrow("Product not found");
  });

  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should find all products", async () => {
    // criando os objetos
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);

    // salvando no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

    // consultando no db utilizando os métodos do repository
    const foundProducts = await productRepository.findAll();

    // realizando as verificações
    expect(foundProducts).toHaveLength(2);
    expect(foundProducts).toContainEqual(product1);
    expect(foundProducts).toContainEqual(product2);
  });
});
