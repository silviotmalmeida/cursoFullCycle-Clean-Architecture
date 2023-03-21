// dependências
import CustomerFactory from "../../../domain/customer/factory/customerFactory";
import UpdateCustomerUseCase from "./updateCustomerUseCase";

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

// criando o mock do repository
const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    // o método find vai retornar o customer criado
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

// suíte de testes do usecase, sem integração
describe("Unit test for customer update use case", () => {
  // se um registro for atualizado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should update a customer", async () => {
    // iniciando o mock do repository
    const customerRepository = MockRepository();
    // iniciando o usecase
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    // criando no db utilizando os métodos do usecase
    const output = await customerUpdateUseCase.execute(input);

    // comparando-se os dados
    expect(output).toEqual(input);
  });
});
