// dependências
import ValidatorInterface from "../../@shared/validator/validatorInterface";
import Customer from "../entity/customer";
import * as yup from "yup";

// classe de validator com yup que implementa a interface ValidatorInterface
export default class CustomerYupValidator
  implements ValidatorInterface<Customer>
{
  // método de validação da entidade
  validate(entity: Customer): void {
    // tratamento de exceções
    try {
      // id e name são obrigatórios
      yup
        .object()
        // definindo os textos dos erros
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        // validação síncrona
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          // valida todos os campos antes de enviar o erro
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      // em caso de erros
      const e = errors as yup.ValidationError;
      // popula o objeto notification da entidade
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}
