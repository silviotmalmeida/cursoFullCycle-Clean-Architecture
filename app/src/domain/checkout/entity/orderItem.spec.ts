// dependências
import OrderItem from "./orderItem";

// criando a suíte de testes unitários
describe("OrderItem unit tests", () => {
  // se um orderItem é criado sem id, é lançado um erro padrão
  it("should throw error when id is empty", () => {
    expect(() => {
      const item = new OrderItem("", "Item 1", 100, "p1", 0);
    }).toThrowError("Id is required");
  });

  // se um orderItem é criado sem name, é lançado um erro padrão
  it("should throw error when name is empty", () => {
    expect(() => {
      const item = new OrderItem("i1", "", 100, "p1", 0);
    }).toThrowError("Name is required");
  });

  // se um orderItem é criado com price inferior ou igual a 0, é lançado um erro padrão
  it("should throw error when price is lower or equal than 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 0, "p1", 0);
    }).toThrowError("Price must be greater than 0");

    expect(() => {
      const item = new OrderItem("i1", "Item 1", -1, "p1", 0);
    }).toThrowError("Price must be greater than 0");
  });

  // se um orderItem é criado sem productId, é lançado um erro padrão
  it("should throw error when productId is empty", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "", 0);
    }).toThrowError("ProductId is required");
  });

  // se um orderItem é criado com quantity inferior ou igual a 0, é lançado um erro padrão
  it("should throw error when quantity is lower or equal than 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
    }).toThrowError("Quantity must be greater than 0");

    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", -1);
    }).toThrowError("Quantity must be greater than 0");
  });
});
