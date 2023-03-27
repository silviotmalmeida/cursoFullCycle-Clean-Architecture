// dependências
import CustomerFactory from "../../../domain/customer/factory/customerFactory";
import ListCustomerUseCase from "./listCustomerUseCase";

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

// criando o mock do repository
const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    // o método findAll vai retornar o array com os customers criados
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

// definindo os dados de input do usecase
const input = {};

// suíte de testes do usecase, sem integração
describe("Unit test for listing customer use case", () => {
  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should list a customer", async () => {
    // iniciando o mock do repository
    const repository = MockRepository();
    // iniciando o usecase
    const useCase = new ListCustomerUseCase(repository);

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
