// dependências
import RepositoryInterface from "../../@shared/repository/repositoryInterface";
import Order from "../entity/order";

// interface a ser implementada pelos orderRepositories dos orm
export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
