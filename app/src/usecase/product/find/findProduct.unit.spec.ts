// dependências
import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/productB";
import FindProductUseCase from "./findProductUseCase";

// criando o product
const product = new Product("123", "Product 1", 25.0);
const productB = new ProductB("456", "Product B", 5.0);

// criando o mock do repository
const MockRepository = () => {
  return {
    // o método find vai retornar o product criado
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

// suíte de testes do usecase, sem integração
describe("Unit Test find product use case", () => {
  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a product", async () => {
    // iniciando o mock do repository
    const productRepository = MockRepository();
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
    // iniciando o mock do repository
    const productRepository = MockRepository();
    // alterando o comportamento do mock
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
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
    // criando o mock do repository
    const MockRepository = () => {
      return {
        // o método find vai retornar o product criado
        find: jest.fn().mockReturnValue(Promise.resolve(productB)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      };
    };

    // iniciando o mock do repository
    const productRepository = MockRepository();
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
