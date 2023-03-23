// dependências
import CreateProductUseCase from "./createProductUseCase";

// definindo os dados de input do usecase
const input = {
  name: "Product 1",
  price: 25.0,
  type: "a",
};

// criando o mock do repository
const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

// suíte de testes do usecase, sem integração
describe("Unit test create product use case", () => {
  // se um product é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a product", async () => {
    // iniciando o mock do repository
    const productRepository = MockRepository();
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
    // iniciando o mock do repository
    const productRepository = MockRepository();
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
    // iniciando o mock do repository
    const productRepository = MockRepository();
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

  // se um product é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a product B", async () => {
    // iniciando o mock do repository
    const productRepository = MockRepository();
    // iniciando o usecase
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    // definindo os dados de input do usecase
    const input = {
      name: "Product B",
      price: 5.0,
      type: "b",
    };

    // criando no db utilizando os métodos do usecase
    const output = await productCreateUseCase.execute(input);

    // comparando-se os dados
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price * 2,
    });
  });
});
