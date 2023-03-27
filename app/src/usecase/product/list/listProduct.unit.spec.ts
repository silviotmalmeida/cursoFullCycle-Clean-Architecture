// dependências
import ProductFactory from "../../../domain/product/factory/productFactory";
import ListProductUseCase from "./listProductUseCase";

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

// criando o mock do repository
const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    // o método findAll vai retornar o array com os products criados
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

// suíte de testes do usecase, sem integração
describe("Unit test for listing product use case", () => {
  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should list a product", async () => {
    // iniciando o mock do repository
    const repository = MockRepository();
    // iniciando o usecase
    const useCase = new ListProductUseCase(repository);

    // buscando no db utilizando os métodos do usecase
    const output = await useCase.execute({});

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
