// dependências
import Notification from "./notification";

// criando a suíte de testes unitários
describe("Unit testss for notifications", () => {
  // o método messages deve retornar os erros cadastrados separados por vírgula e filtrado pelo contexto passaro pelo argumento
  it("should create errors", () => {
    // criando a notification
    const notification = new Notification();
    // verificando-se os erros
    expect(notification.messages()).toBe("");

    // criando o erro
    const error = {
      message: "error message",
      context: "customer",
    };
    // adicionando o erro à notification
    notification.addError(error);
    // verificando-se os erros
    expect(notification.messages("customer")).toBe("customer: error message,");

    // criando o erro
    const error2 = {
      message: "error message2",
      context: "customer",
    };
    // adicionando o erro à notification
    notification.addError(error2);
    // verificando-se os erros
    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );

    // criando o erro
    const error3 = {
      message: "error message3",
      context: "order",
    };
    // adicionando o erro à notification
    notification.addError(error3);
    // verificando-se os erros
    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );
    expect(notification.messages()).toBe(
      "customer: error message,customer: error message2,order: error message3,"
    );
  });

  // o método hasErrors deve verificar a existência de pelo menos um erro
  it("should check if notification has at least one error", () => {
    // criando a notification
    const notification = new Notification();
    // verificando-se os erros
    expect(notification.hasErrors()).toBe(false);

    // criando o erro
    const error = {
      message: "error message",
      context: "customer",
    };
    // adicionando o erro à notification
    notification.addError(error);

    // verificando-se os erros
    expect(notification.hasErrors()).toBe(true);
  });

  // o método getErrors deve retornar um array com os erros
  it("should get all errors props", () => {
    // criando a notification
    const notification = new Notification();
    // verificando-se os erros
    expect(notification.getErrors()).toEqual([]);

    // criando o erro
    const error = {
      message: "error message",
      context: "customer",
    };
    // adicionando o erro à notification
    notification.addError(error);
    // verificando-se os erros
    expect(notification.getErrors()).toEqual([error]);
  });
});
