// dependências
import Order from "./order";
import OrderItem from "./orderItem";

// criando a suíte de testes unitários
describe("Order unit tests", () => {
  // se uma order é criada sem id, é lançado um erro padrão
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  // se uma order é criada sem customerId, é lançado um erro padrão
  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  // se uma order é criada sem items, é lançado um erro padrão
  it("should throw error when items is empty", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  // se uma order é criada com items de quantidade 0, é lançado um erro padrão
  it("should throw error if the item qte is less or equal zero 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than 0");
  });

  // o método changeItems() deve ser capaz de atualizar somente os items
  it("should change items", () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item1]);

    expect(order.id).toBe("o1");
    expect(order.customerId).toBe("c1");
    expect(order.items).toStrictEqual([item1]);

    order.changeItems([item1, item2]);

    expect(order.id).toBe("o1");
    expect(order.customerId).toBe("c1");
    expect(order.items).toStrictEqual([item1, item2]);

    expect(() => {
      order.changeItems([]);
    }).toThrowError("Items are required");
  });

  // o método total() deve ser capaz de totalizar o valor da order a partir do somatório dos prices dos items
  it("should calculate total", () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order1 = new Order("o1", "c1", [item1]);
    let total = order1.total();

    expect(order1.total()).toBe(200);

    const order2 = new Order("o1", "c1", [item1, item2]);
    total = order2.total();

    expect(total).toBe(600);
  });
});
