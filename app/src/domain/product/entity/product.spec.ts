// dependências
import Product from "./product";

// criando a suíte de testes unitários
describe("Product unit tests", () => {
  // se um product é criado sem id, é lançado um erro padrão
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  // se um product é criado sem name, é lançado um erro padrão
  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  // se um product é criado sem id e name, é lançado um erro padrão
  it("should throw error when id and name is empty", () => {
    expect(() => {
      const product = new Product("", "", 100);
    }).toThrowError("product: Id is required,product: Name is required");
  });

  // se um orderItem é criado com price inferior ou igual a 0, é lançado um erro padrão
  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", 0);
    }).toThrowError("product: Price must be greater than zero");

    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  // o método changeName() deve ser capaz de atualizar somente o name
  it("should change name", () => {
    // Arrange (preparando os dados)
    const product = new Product("123", "Product 1", 100);

    // Act (executando as funções a serem avaliadas)
    product.changeName("Product 2");

    // Assert (testando os resultados)
    expect(product.id).toBe("123");
    expect(product.name).toBe("Product 2");
    expect(product.price).toBe(100);
  });

  // o método changePrice() deve ser capaz de atualizar somente o price
  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);

    expect(product.id).toBe("123");
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(150);
  });
});
