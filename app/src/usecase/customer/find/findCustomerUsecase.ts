// dependências
import CustomerRepositoryInterface from "../../../domain/customer/repository/customerRepositoryInterface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./findCustomerDto";

// usecase de busca a partir do inputDto, retornando o outputDto
export default class FindCustomerUseCase {
  // definindo os atributos
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  // definindo o construtor com os atributos mínimos necessários
  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    // consultando no db, a partir dos dados do inputDto, utilizando os métodos do repository
    const customer = await this.customerRepository.find(input.id);

    // retornando os dados no formato do outputDto
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    };
  }
}
