// dependências
import ValidatorInterface from "../../@shared/validator/validatorInterface";
import Product from "../entity/product";
import * as yup from "yup";

// classe de validator com yup que implementa a interface ValidatorInterface
export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  // método de validação da entidade
  validate(entity: Product): void {
    // tratamento de exceções
    try {
      // id e name são obrigatórios
      yup
        .object()
        // definindo os textos dos erros
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .required("Price must be greater than zero")
            .positive("Price must be greater than zero"),
        })
        // validação síncrona
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
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
          context: "product",
          message: error,
        });
      });
    }
  }
}
