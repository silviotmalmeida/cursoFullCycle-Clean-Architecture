// dependências
import EventDispatcher from "../../@shared/event/eventDispatcher";
import SendConsoleLog1Handler from "../event/handler/sendConsoleLog1Handler";
import SendConsoleLog2Handler from "../event/handler/sendConsoleLog2Handler";
import SendConsoleLogHandler from "../event/handler/sendConsoleLogHandler";
import Address from "../value-object/address";
import Customer from "./customer";

// criando a suíte de testes unitários
describe("Customer unit tests", () => {
  // se um customer é criado sem id, é lançado um erro padrão
  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
    }).toThrowError("customer: Id is required");
  });

  // se um customer é criado sem name, é lançado um erro padrão
  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("123", "");
    }).toThrowError("customer: Name is required");
  });

  // se um customer é criado sem id e name, é lançado um erro padrão
  it("should throw error when id and name is empty", () => {
    expect(() => {
      const customer = new Customer("", "");
    }).toThrowError("customer: Id is required,customer: Name is required");
  });

  // o método changename() deve ser capaz de atualizar somente o name
  it("should change name", () => {
    // Arrange (preparando os dados)
    const customer = new Customer("1", "Customer 1");

    // Act (executando as funções a serem avaliadas)
    customer.changeName("Jane");

    // Assert (testando os resultados)
    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Jane");
    expect(customer.address).toBe(undefined);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
  });

  // o método changeAddress() deve ser capaz de atualizar somente o address
  it("should change address", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");

    customer.changeAddress(address);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
  });

  // se um customer é ativado sem address, é lançado um erro padrão
  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  // o método activate() deve ser capaz de atualizar somente o active para true
  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);

    customer.activate();

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(true);
    expect(customer.rewardPoints).toBe(0);
  });

  // o método deactivate() deve ser capaz de atualizar somente o active para false
  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);
    customer.activate();

    customer.deactivate();

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
  });

  // se tentar adicionar rewardPoints negativos, é lançado um erro padrão
  it("should throw error when trying to add negative reward points", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.addRewardPoints(-10);
    }).toThrowError("Points must be a positive number");
  });

  // o método addRewardPoints() deve ser capaz somente de incrementar o rewardPoints
  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(20);
  });

  // se um customer for criado, os respectivos eventHandlers registrados devem ser notificados para ação
  it("should notify event handlers, when customer is created", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();
    // criando os eventHandlers
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    // registrando os eventHandlers
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    // criando os espiões para verificar se os métodos handle serão executados
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    // criando o customer
    const customer = new Customer("1", "Customer 1", eventDispatcher);

    // verificando se os métodos handle foram executados
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  // se um address for alterado, os respectivos eventHandlers registrados devem ser notificados para ação
  it("should notify event handlers, when customer address is changed", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();
    // criando o eventHandler
    const eventHandler = new SendConsoleLogHandler();
    // registrando o eventHandler
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    // criando um espião para verificar se o método handle será executado
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    // criando o customer e alterando o endereço
    const customer = new Customer("1", "Customer 1", eventDispatcher);
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);

    // verificando se o método handle foi executado
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
