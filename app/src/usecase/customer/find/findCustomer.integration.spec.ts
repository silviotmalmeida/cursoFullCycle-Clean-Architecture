// dependências
import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customerModel";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customerRepository";
import FindCustomerUseCase from "./findCustomerUseCase";

// criando a suíte de testes do usecase, com integração
describe("Test find customer use case", () => {
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

  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a customer", async () => {

    // criando o objeto
    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

    // salvando no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // iniciando o usecase
    const usecase = new FindCustomerUseCase(customerRepository);

    // definindo o formato dos dados de entrada
    const input = {
      id: "123",
    };

    // definindo o formato dos dados de saída
    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    // consultando no db utilizando os métodos do usecase
    const result = await usecase.execute(input);

    // comparando-se os dados
    expect(result).toEqual(output);
  });
});
