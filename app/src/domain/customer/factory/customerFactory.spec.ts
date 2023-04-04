// dependências
import CustomerFactory from "./customerFactory";
import EventDispatcher from "../../@shared/event/eventDispatcher";

// criando a suíte de testes unitários
describe("Customer factory unit test", () => {
  // se um customer sem address é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a customer, without event dispatcher", () => {
    // definindo as props de entrada
    const customerProps = {
      name: "Customer 1",
    };

    // criando os objetos do agregado através da factory
    const customer = CustomerFactory.create(customerProps);

    // verificando os atributos
    expect(customer.id).toBeDefined;
    expect(customer.name).toEqual(customerProps.name);
    expect(customer.address).toBeUndefined();
    expect(customer.eventDispatcher).toBeUndefined();
  });

  // se um customer com address é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a customer with an address, without event dispatcher", () => {
    // definindo as props de entrada
    const customerProps = {
      name: "Customer 1",
      street: "Street 1",
      number: 123,
      zip: "13330-250",
      city: "São Paulo",
    };

    // criando os objetos do agregado através da factory
    const customer = CustomerFactory.createWithAddress(customerProps);

    // verificando os atributos
    expect(customer.id).toBeDefined;
    expect(customer.name).toEqual(customerProps.name);
    expect(customer.address.street).toEqual(customerProps.street);
    expect(customer.address.number).toEqual(customerProps.number);
    expect(customer.address.zip).toEqual(customerProps.zip);
    expect(customer.address.city).toEqual(customerProps.city);
    expect(customer.eventDispatcher).toBeUndefined();
  });

  // se um customer com eventDispatcher é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a customer, with event dispatcher", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();

    // definindo as props de entrada
    const customerProps = {
      name: "Customer 1",
      eventDispatcher: eventDispatcher,
    };

    // criando os objetos do agregado através da factory
    const customer = CustomerFactory.createWithEventDispatcher(customerProps);

    // verificando os atributos
    expect(customer.id).toBeDefined;
    expect(customer.name).toEqual(customerProps.name);
    expect(customer.address).toBeUndefined();
    expect(customer.eventDispatcher).toEqual(customerProps.eventDispatcher);
  });

  // se tentar utilizar o método createWithEventDispatcher sem atribuir um eventDispatcher, deve-se lançar uma exceção
  it("should throw error when trying to use createWithEventDispatcher() without eventDispatcher", () => {
    expect(() => {
      const customerProps = {
        name: "Customer 1",
      };
      const customer = CustomerFactory.createWithEventDispatcher(customerProps);
    }).toThrowError("EventDispatcher cannot be undefined");
  });

  // se um customer com address e eventDispatcher é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a customer with an address and event dispatcher", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();

    // definindo as props de entrada
    const customerProps = {
      name: "Customer 1",
      street: "Street 1",
      number: 123,
      zip: "13330-250",
      city: "São Paulo",
      eventDispatcher: eventDispatcher,
    };

    // criando os objetos do agregado através da factory
    const customer =
      CustomerFactory.createWithAddressAndEventDispatcher(customerProps);

    // verificando os atributos
    expect(customer.id).toBeDefined;
    expect(customer.name).toEqual(customerProps.name);
    expect(customer.address.street).toEqual(customerProps.street);
    expect(customer.address.number).toEqual(customerProps.number);
    expect(customer.address.zip).toEqual(customerProps.zip);
    expect(customer.address.city).toEqual(customerProps.city);
    expect(customer.eventDispatcher).toEqual(customerProps.eventDispatcher);
  });

  // se tentar utilizar o método createWithAddressAndEventDispatcher sem atribuir um eventDispatcher, deve-se lançar uma exceção
  it("should throw error when trying to use createWithAddressAndEventDispatcher() without eventDispatcher", () => {
    expect(() => {
      const customerProps = {
        name: "Customer 1",
        street: "Street 1",
        number: 123,
        zip: "13330-250",
        city: "São Paulo",
      };
      const customer =
        CustomerFactory.createWithAddressAndEventDispatcher(customerProps);
    }).toThrowError("EventDispatcher cannot be undefined");
  });
});
