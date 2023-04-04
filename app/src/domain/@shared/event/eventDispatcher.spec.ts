import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/sendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "../../product/event/productCreatedEvent";
import EventDispatcher from "./eventDispatcher";

// criando a suíte de testes unitários
describe("Domain events tests", () => {
  // se for registrado um eventHandler em um eventDispatcher, o registro deve ser confirmado
  it("should register an event handler", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();
    // criando o eventHandler
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    // registrando o eventHandler
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // verifica se o eventHandler foi incluído no array da referida chave
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    // verifica que o array da referida chave só possui um evento
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    // verifica que o eventHandler que foi inserido corresponde ao que foi criado
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  // se for removido um eventHandler em um eventDispatcher, a remoção deve ser confirmada
  it("should unregister an event handler", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();
    // criando o eventHandler
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    // registrando o eventHandler
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // verifica que o eventHandler que foi inserido corresponde ao que foi criado
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    // removendo o eventHandler
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    // verifica que o eventHandler foi removido
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  // se forem removidos todos os eventHandler em um eventDispatcher, a remoção deve ser confirmada
  it("should unregister all event handlers", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();
    // criando o eventHandler
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    // registrando o eventHandler
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    // verifica que o eventHandler que foi inserido corresponde ao que foi criado
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    // removendo todos os eventHandlers
    eventDispatcher.unregisterAll();

    // verifica que o todos os eventHandlers foram removidos
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  // se um event ocorrer, os respectivos eventHandlers registrados devem ser notificados para ação
  it("should notify all event handlers", () => {
    // criando o eventDispatcher
    const eventDispatcher = new EventDispatcher();
    // criando o eventHandler
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    // registrando o eventHandler
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    // criando um espião para verificar se o método handle será executado
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    // verifica que o eventHandler que foi inserido corresponde ao que foi criado
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    // criando o evento
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // notificando os eventHandlers registrados associados oa evento
    eventDispatcher.notify(productCreatedEvent);

    // verificando se o método handle foi executado
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
