// dependências
import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customerFactory";
import ListCustomerUseCase from "./listCustomerUseCase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customerModel";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customerRepository";

// definindo as props de entrada da factory
const customerProps1 = {
  name: "John Doe",
  street: "Street 1",
  number: 1,
  zip: "12345",
  city: "City",
};
const customerProps2 = {
  name: "Jane Doe",
  street: "Street 2",
  number: 2,
  zip: "123456",
  city: "City 2",
};

// criando os customers
const customer1 = CustomerFactory.createWithAddress(customerProps1);
const customer2 = CustomerFactory.createWithAddress(customerProps2);

// definindo os dados de input do usecase
const input = {};

// suíte de testes do usecase, sem integração
describe("Unit test for listing customer use case", () => {
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

  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should list a customer", async () => {
    // salvando no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    // iniciando o usecase
    const useCase = new ListCustomerUseCase(customerRepository);

    // buscando no db utilizando os métodos do usecase
    const output = await useCase.execute(input);

    // comparando-se os dados
    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});
