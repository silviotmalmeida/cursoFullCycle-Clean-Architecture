// dependências
import { app, sequelize } from "../express";
import request from "supertest";

// criando a suíte de testes end-to-end
describe("E2E test for customer", () => {
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
  it("should create a customer", async () => {
    // realizando a requisição de criação
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345",
        },
      });

    // comparando-se os dados
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });

  // se um customer é criado de forma incompleta, retorna erro 500
  it("should not create a customer", async () => {
    // realizando a requisição de criação incompleta
    const response = await request(app).post("/customer").send({
      name: "john",
    });
    // conferindo o retorno
    expect(response.status).toBe(500);
  });

  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should list all customer", async () => {
    // realizando a requisição de criação do primeiro registro
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345",
        },
      });
    // conferindo o retorno
    expect(response.status).toBe(200);
    // realizando a requisição de criação do segundo registro
    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 1234,
          zip: "12344",
        },
      });
    // conferindo o retorno
    expect(response2.status).toBe(200);

    // realizando a requisição de busca geral
    const listResponse = await request(app).get("/customer").send();

    // comparando-se os dados
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe("John");
    expect(customer.address.street).toBe("Street");
    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Jane");
    expect(customer2.address.street).toBe("Street 2");
  });
});
