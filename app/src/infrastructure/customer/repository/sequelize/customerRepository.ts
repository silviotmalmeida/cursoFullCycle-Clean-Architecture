// dependências
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customerRepositoryInterface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customerModel";

// classe de repositório do orm, implementando a interface de repositório definida no domain
export default class CustomerRepository implements CustomerRepositoryInterface {
  // método de criação
  async create(entity: Customer): Promise<void> {
    // utiliza o método default do orm
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  // método de atualização
  async update(entity: Customer): Promise<void> {
    // utiliza o método default do orm
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  // método de busca por id
  async find(id: string): Promise<Customer> {
    // obtendo os dados do bd
    let customerModel;
    // tratamento de exceções
    try {
      // utiliza o método default do orm
      customerModel = await CustomerModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      // em caso de inexistência, lança uma exceção
      throw new Error("Customer not found");
    }

    // recriando a entidade do agregado, a partir dos dados do bd
    const customer = new Customer(id, customerModel.name);
    customer.addRewardPoints(customerModel.rewardPoints);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer.changeAddress(address);
    if (customerModel.active) {
      customer.activate();
    }
    return customer;
  }

  // método de busca
  async findAll(): Promise<Customer[]> {
    // utiliza o método default do orm
    const customerModels = await CustomerModel.findAll();

    //iterando sobre os registros
    const customers = customerModels.map(
      // recriando as entidades do agregado, a partir dos dados do bd
      (customerModels) => {
        let customer = new Customer(customerModels.id, customerModels.name);
        customer.addRewardPoints(customerModels.rewardPoints);
        const address = new Address(
          customerModels.street,
          customerModels.number,
          customerModels.zipcode,
          customerModels.city
        );
        customer.changeAddress(address);
        if (customerModels.active) {
          customer.activate();
        }
        return customer;
      }
    );

    return customers;
  }
}
