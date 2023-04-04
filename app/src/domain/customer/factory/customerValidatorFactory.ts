// dependências
import ValidatorInterface from "../../@shared/validator/validatorInterface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customerYupValidator";

// factory para o validator da entidade
export default class CustomerValidatorFactory {
  // método estático para criar o validator
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
