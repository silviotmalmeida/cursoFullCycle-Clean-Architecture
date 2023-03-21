// dependências
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customerRepositoryInterface";
import { InputListCustomerDto, OutputListCustomerDto } from "./listCustomerDto";

// usecase de criação a partir do inputDto, retornando o outputDto
export default class ListCustomerUseCase {
  // definindo os atributos
  private customerRepository: CustomerRepositoryInterface;

  // definindo o construtor com os atributos mínimos necessários
  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.customerRepository = CustomerRepository;
  }

  // definindo o método de execução do usecase
  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    // consultando no db, utilizando os métodos do repository
    const customers = await this.customerRepository.findAll();

    // retornando os dados no formato do outputDto
    return OutputMapper.toOutput(customers);
  }
}

// classe auxiliar para formatar os dados conforme o outputDto
class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      })),
    };
  }
}
