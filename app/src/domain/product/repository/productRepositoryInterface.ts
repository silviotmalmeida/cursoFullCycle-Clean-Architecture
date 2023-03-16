// dependências
import RepositoryInterface from "../../shared/repository/repositoryInterface";
import Product from "../entity/product";

// interface a ser implementada pelos productRepositories dos orm
export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}