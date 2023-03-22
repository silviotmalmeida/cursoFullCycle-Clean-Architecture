// dependências
import { Sequelize } from "sequelize-typescript";
import CreateCustomerUseCase from "./createCustomerUseCase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customerModel";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customerRepository";

// definindo os dados de input do usecase
const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

// suíte de testes do usecase, sem integração
describe("Unit test create customer use case", () => {
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
    await sequelize.addModels([CustomerModel]);
    // criando o db
    await sequelize.sync();
  });

  // ações que ocorrem após de cada teste
  afterEach(async () => {
    // encerrando o db
    await sequelize.close();
  });

  // se um customer com address é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a customer", async () => {
    // iniciando o repository
    const customerRepository = new CustomerRepository();
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
    // iniciando o repository
    const customerRepository = new CustomerRepository();
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
    // iniciando o repository
    const customerRepository = new CustomerRepository();
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
