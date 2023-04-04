// dependências
import ValidatorInterface from "../../@shared/validator/validatorInterface";
import ProductInterface from "../entity/productInterface";
import ProductYupValidator from "../validator/productYupValidator";

// factory para o validator da entidade
export default class ProductValidatorFactory {
  // método estático para criar o validator
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator();
  }
}
