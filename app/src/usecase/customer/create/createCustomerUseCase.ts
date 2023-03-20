// dependências
import CustomerRepositoryInterface from "../../../domain/customer/repository/customerRepositoryInterface";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./createCustomerDto";
import CustomerFactory from "../../../domain/customer/factory/customerFactory";

// usecase de criação a partir do inputDto, retornando o outputDto
export default class CreateCustomerUseCase {
  // definindo os atributos
  private customerRepository: CustomerRepositoryInterface;

  // definindo o construtor com os atributos mínimos necessários
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  // definindo o método de execução do usecase
  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    // definindo as props de entrada da factory
    const customerProps = {
      name: input.name,
      street: input.address.street,
      number: input.address.number,
      zip: input.address.zip,
      city: input.address.city,
    };

    // criando os objetos do agregado através da factory
    const customer = CustomerFactory.createWithAddress(customerProps);

    // criando no db, utilizando os métodos do repository
    await this.customerRepository.create(customer);

    // retornando os dados no formato do outputDto
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
