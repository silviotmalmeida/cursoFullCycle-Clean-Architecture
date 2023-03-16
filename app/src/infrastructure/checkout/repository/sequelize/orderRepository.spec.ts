// dependências
import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customerModel";
import CustomerRepository from "../../../customer/repository/sequelize/customerRepository";
import OrderItemModel from "./orderItemModel";
import OrderModel from "./orderModel";
import OrderRepository from "./orderRepository";
import ProductModel from "../../../product/repository/sequelize/productModel";
import ProductRepository from "../../../product/repository/sequelize/productRepository";

// criando a suíte de testes unitários
describe("Order repository test", () => {
  // inicializando a variável do orm
  let sequelize: Sequelize;

  // ações que ocorrem antes de cada teste
  beforeEach(async () => {
    // configurando o orm
    sequelize = new Sequelize({
      dialect: "sqlite", // definindo o db
      storage: ":memory:", // definindo que irá gravar em memória
      logging: false, // sem login
      sync: { force: true }, // criar as tabelas ao inicializar o db
    });
    // adicionando as models a serem consideradas na criação das tabelas
    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    // criando o db
    await sequelize.sync();
  });

  // ações que ocorrem após de cada teste
  afterEach(async () => {
    // encerrando o db
    await sequelize.close();
  });

  // se um registro for armazenado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should create a new order", async () => {
    // criando o customer
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    // salvando o customer no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // criando o product
    const product = new Product("123", "Product 1", 10);
    // salvando o product no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // criando o orderItem
    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    // criando o order
    const order = new Order("123", customer.id, [ordemItem]);
    // salvando o product no db utilizando os métodos do repository
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // consultando no db utilizando os métodos do orm
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // comparando-se os dados
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });

  // se um registro for atualizado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should update a order", async () => {
    // criando o customer
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    // salvando o customer no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // criando o product
    const product = new Product("123", "Product 1", 10);
    // salvando o product no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // criando o orderItem
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    // criando o order
    const order = new Order("123", customer.id, [orderItem]);
    // salvando o product no db utilizando os métodos do repository
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // consultando no db utilizando os métodos do orm
    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // comparando-se os dados
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });

    // alterando os dados
    // criando o product
    const product2 = new Product("456", "Product 2", 20);
    // salvando o product no db utilizando os métodos do repository
    await productRepository.create(product2);

    // criando o orderItem
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      3
    );
    // alterando os orderItems do order
    order.changeItems([orderItem, orderItem2]);

    // atualizando os dados no db utilizando os métodos do repository
    try {
      await sequelize.transaction(async (transaction) => {
        await orderRepository.update(order);
      });
    } catch (err) {
      // em caso de erro, envia uma mensage
      throw new Error("Database error");
    }

    // consultando no db utilizando os métodos do orm
    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // comparando-se os dados
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id,
        },
      ],
    });
  });

  // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
  it("should find a order", async () => {
    // criando o customer
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    // salvando o customer no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // criando o product
    const product = new Product("123", "Product 1", 10);
    // salvando o product no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // criando o orderItem
    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    // criando o order
    const order = new Order("123", customer.id, [ordemItem]);
    // salvando o product no db utilizando os métodos do repository
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // consultando no db utilizando os métodos do repository
    const orderResult = await orderRepository.find(order.id);

    // comparando-se os dados
    expect(order).toStrictEqual(orderResult);
  });

  // se for executada uma busca por id e a mesma não retornar registros, deve-se lançar uma exceção
  it("should throw an error when order id is not found", async () => {
    // consultando no db utilizando os métodos do repository, por um registro inexistente
    const orderRepository = new OrderRepository();
    expect(async () => {
      await orderRepository.find("456ABC");
    }).rejects.toThrow("Order not found");
  });

  // se for executada uma busca geral, os atributos devem ser iguais aos dos objetos de origem
  it("should find all orders", async () => {
    // criando o customer
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1);
    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    // salvando o customer no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    // criando o product
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);
    // salvando o product no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

    // criando o orderItem
    const ordemItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      3
    );
    // criando o order
    const order1 = new Order("123", customer1.id, [ordemItem1]);
    const order2 = new Order("456", customer2.id, [ordemItem2]);

    // salvando o product no db utilizando os métodos do repository
    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    // consultando no db utilizando os métodos do repository
    const orders = await orderRepository.findAll();

    // realizando as verificações
    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
