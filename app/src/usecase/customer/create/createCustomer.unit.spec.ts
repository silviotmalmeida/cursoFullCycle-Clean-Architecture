// dependências
import CreateCustomerUseCase from "./createCustomerUseCase";

// definindo o formato dos dados de entrada
const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
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
describe("Unit test create customer use case", () => {
  // se um customer com address é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a customer", async () => {
    // iniciando o mock do repository
    const customerRepository = MockRepository();
    // iniciando o usecase
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    // criando no db utilizando os métodos do usecase
    const output = await customerCreateUseCase.execute(input);

    // comparando-se os dados
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  // se um customer com address é criado através da factory, sem o atributo name, deve-se enviar mensagem de erro
  it("should thrown an error when name is missing", async () => {
    // iniciando o mock do repository
    const customerRepository = MockRepository();
    // iniciando o usecase
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    // alterando o atributo name para vazio
    input.name = "";
    // verificando a mensagem de erro
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  // se um customer com address é criado através da factory, sem o atributo street, deve-se enviar mensagem de erro
  it("should thrown an error when street is missing", async () => {
    // iniciando o mock do repository
    const customerRepository = MockRepository();
    // iniciando o usecase
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    // alterando o atributo name para válido
    input.name = "John";
    // alterando o atributo street para vazio
    input.address.street = "";
    // verificando a mensagem de erro
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
