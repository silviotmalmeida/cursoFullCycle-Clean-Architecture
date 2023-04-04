// dependências
import RepositoryInterface from "../../@shared/repository/repositoryInterface";
import ProductInterface from "../entity/productInterface";

// interface a ser implementada pelos productRepositories dos orm
export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}