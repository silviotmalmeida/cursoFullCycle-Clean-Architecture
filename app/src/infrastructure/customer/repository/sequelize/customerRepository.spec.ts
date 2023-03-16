// dependências
import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customerModel";
import CustomerRepository from "./customerRepository";

// criando a suíte de testes unitários
describe("Customer repository test", () => {
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

  // se um registro for armazenado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should create a customer", async () => {
    // criando o objeto
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    // salvando no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // consultando no db utilizando os métodos do orm
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    // comparando-se os dados
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  // se um registro for atualizado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should update a customer", async () => {
    // criando o objeto
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    // salvando no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // consultando no db utilizando os métodos do orm
    let customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    // comparando-se os dados
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });

    // alterando os dados
    customer.changeName("Customer 2");

    // atualizando os dados no db utilizando os métodos do repository
    await customerRepository.update(customer);

    // consultando no db utilizando os métodos do orm
    customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    // comparando-se os dados atualizados
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a customer", async () => {
    // criando o objeto
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    // salvando no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // consultando no db utilizando os métodos do repository
    const customerResult = await customerRepository.find(customer.id);

    // comparando-se os dados
    expect(customer).toStrictEqual(customerResult);
  });

  // se for executada uma busca por id e a mesma não retornar registros, deve-se lançar uma exceção
  it("should throw an error when customer id is not found", async () => {
    // consultando no db utilizando os métodos do repository, por um registro inexistente
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should find all customers", async () => {
    // criando os objetos
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    // salvando no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    // consultando no db utilizando os métodos do repository
    const customers = await customerRepository.findAll();

    // realizando as verificações
    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
