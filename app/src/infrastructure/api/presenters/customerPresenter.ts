// sempre que a resposta da requisição for diferente do outputDTO deve-se criar um presenter
// dependências
import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/listCustomerDto";

// presenter para respostas em xml
export default class CustomerPresenter {
  // método de conversão para xml
  static listXML(data: OutputListCustomerDto): string {
    // opções do xml
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    // retornarndo a resposta convertida para xml
    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city,
            },
          })),
        },
      },
      xmlOption
    );
  }
}
