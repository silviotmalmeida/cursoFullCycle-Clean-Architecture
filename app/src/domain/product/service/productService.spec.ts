// dependências
import Product from "../entity/product";
import ProductService from "./productService";

// criando a suíte de testes unitários
describe("Product service unit tests", () => {
  // o método increasePrice() deve ser capaz de atualizar somente o price de uma lista de products
  it("should change the prices of all products", () => {
    const product1 = new Product("product1", "Product 1", 10);
    const product2 = new Product("product2", "Product 2", 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.id).toBe("product1");
    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(20);

    expect(product2.id).toBe("product2");
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(40);

    ProductService.increasePrice(products, -50);

    expect(product1.id).toBe("product1");
    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(10);

    expect(product2.id).toBe("product2");
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(20);
  });
});
