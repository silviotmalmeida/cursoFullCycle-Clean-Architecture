// dependências
import RepositoryInterface from "../../shared/repository/repositoryInterface";
import Customer from "../entity/customer";

// interface a ser implementada pelos customerRepositories dos orm
export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
