// dependências
import ProductFactory from "../../../domain/product/factory/productFactory";
import UpdateProductUseCase from "./updateProductUseCase";

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

// criando o mock do repository
const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    // o método find vai retornar o product criado
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

// suíte de testes do usecase, sem integração
describe("Unit test for product update use case", () => {
  // se um registro for atualizado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should update a product", async () => {
    // iniciando o mock do repository
    const productRepository = MockRepository();
    // iniciando o usecase
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    // criando no db utilizando os métodos do usecase
    const output = await productUpdateUseCase.execute(input);

    // comparando-se os dados
    expect(output).toEqual(input);
  });
});
