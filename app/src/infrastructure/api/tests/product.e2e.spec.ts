// dependências
import { app, sequelize } from "../express";
import request from "supertest";

// criando a suíte de testes end-to-end
describe("E2E test for product", () => {
  // ações que ocorrem antes de cada teste
  beforeEach(async () => {
    // recriando o db
    await sequelize.sync({ force: true });
  });

  // ações que ocorrem após todos os testes
  afterAll(async () => {
    // encerrando o db
    await sequelize.close();
  });

  // se um registro for armazenado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should create a product", async () => {
    // realizando a requisição de criação
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 25.0,
      type: "a",
    });

    // comparando-se os dados
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(25.0);
  });

  // se um product é criado de forma incompleta, retorna erro 500
  it("should not create a product", async () => {
    // realizando a requisição de criação incompleta
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });
    // conferindo o retorno
    expect(response.status).toBe(500);
  });

  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should list all products", async () => {
    // realizando a requisição de criação do primeiro registro
    const response = await request(app).post("/product").send({
      name: "Product A",
      price: 1,
      type: "a",
    });
    // conferindo o retorno
    expect(response.status).toBe(200);
    // realizando a requisição de criação do segundo registro
    const response2 = await request(app).post("/product").send({
      name: "Product B",
      price: 2,
      type: "b",
    });
    // conferindo o retorno
    expect(response2.status).toBe(200);

    // realizando a requisição de busca geral
    const listResponse = await request(app).get("/product").send();

    // comparando-se os dados
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Product A");
    expect(product1.price).toBe(1);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product B");
    expect(product2.price).toBe(4);
  });
});
