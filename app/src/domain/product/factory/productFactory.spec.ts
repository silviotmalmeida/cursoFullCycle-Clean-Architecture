// dependências
import { v4 as uuid } from "uuid";
import ProductFactory from "./productFactory";

// criando a suíte de testes unitários
describe("Product factory unit test", () => {
  // se product do tipo a é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a proct type a", () => {
    // definindo as props de entrada
    const productProps = {
      id: uuid(),
      name: "Product A",
      price: 1,
      type: "a",
    };

    // criando os objetos do agregado através da factory
    const product = ProductFactory.create(productProps);

    // verificando os atributos
    expect(product.id).toEqual(productProps.id);
    expect(product.name).toEqual(productProps.name);
    expect(product.price).toEqual(productProps.price);
    expect(product.constructor.name).toBe("Product");
  });

  // se product do tipo b é criado através da factory, seus atributos devem estar consistentes com as props de entrada
  it("should create a proct type b", () => {
    // definindo as props de entrada
    const productProps = {
      id: uuid(),
      name: "Product B",
      price: 1,
      type: "b",
    };

    // criando os objetos do agregado através da factory
    const product = ProductFactory.create(productProps);

    // verificando os atributos
    expect(product.id).toEqual(productProps.id);
    expect(product.name).toEqual(productProps.name);
    expect(product.price).toEqual(productProps.price * 2);
    expect(product.constructor.name).toBe("ProductB");
  });

  // se tentar criar um product de categoria não suportado, lança uma exceção
  it("should throw an error when product type is not supported", () => {
    expect(() => {
      const productProps = {
        id: uuid(),
        name: "Product B",
        price: 1,
        type: "c",
      };
      ProductFactory.create(productProps);
    }).toThrowError("Product type not supported");
  });
});
