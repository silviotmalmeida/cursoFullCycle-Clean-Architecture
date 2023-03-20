// dependências
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./findCustomerUseCase";

// criando o customer
const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

// criando o mock do repository
const MockRepository = () => {
  return {
    // o método find vai retornar o customer criado
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

// suíte de testes do usecase, sem integração
describe("Unit Test find customer use case", () => {
  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a customer", async () => {
    // iniciando o mock do repository
    const customerRepository = MockRepository();
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

  // se for executada uma busca por id sem sucesso, deve-se retornar mensagem de erro
  it("should not find a customer", async () => {
    // iniciando o mock do repository
    const customerRepository = MockRepository();
    // alterando o comportamento do mock
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    // iniciando o usecase
    const usecase = new FindCustomerUseCase(customerRepository);

    // definindo o formato dos dados de entrada
    const input = {
      id: "123",
    };

    // comparando-se os dados
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
