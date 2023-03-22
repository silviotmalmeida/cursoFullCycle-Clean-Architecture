// dependências
import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customerFactory";
import UpdateCustomerUseCase from "./updateCustomerUseCase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customerModel";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customerRepository";

// definindo as props de entrada da factory
const customerProps = {
  name: "John",
  street: "Street",
  number: 123,
  zip: "Zip",
  city: "City",
};

// criando o customer
const customer = CustomerFactory.createWithAddress(customerProps);

// definindo os dados de input do usecase
const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated",
  },
};

// suíte de testes do usecase, sem integração
describe("Unit test for customer update use case", () => {
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

  // se um registro for atualizado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should update a customer", async () => {
    // salvando no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // iniciando o usecase
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    // criando no db utilizando os métodos do usecase
    const output = await customerUpdateUseCase.execute(input);

    // comparando-se os dados
    expect(output).toEqual(input);
  });
});
