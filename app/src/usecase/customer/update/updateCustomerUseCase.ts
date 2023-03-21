// dependências
import CustomerRepositoryInterface from "../../../domain/customer/repository/customerRepositoryInterface";
import Address from "../../../domain/customer/value-object/address";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./updateCustomerDto";

// usecase de criação a partir do inputDto, retornando o outputDto
export default class UpdateCustomerUseCase {
  // definindo os atributos
  private CustomerRepository: CustomerRepositoryInterface;

  // definindo o construtor com os atributos mínimos necessários
  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository;
  }

  // definindo o método de execução do usecase
  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    // consultando no db, a partir dos dados do inputDto, utilizando os métodos do repository
    const customer = await this.CustomerRepository.find(input.id);

    // aplicando as alterações a partir dos daddos do inputDto
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    // atualizando o db, utilizando os métodos do repository
    await this.CustomerRepository.update(customer);

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
