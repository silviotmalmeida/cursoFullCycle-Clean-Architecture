// dependências
import ProductFactory from "../../../domain/product/factory/productFactory";
import ProductRepositoryInterface from "../../../domain/product/repository/productRepositoryInterface";
import { InputFindProductDto, OutputFindProductDto } from "./findProductDto";

// usecase de criação a partir do inputDto, retornando o outputDto
export default class FindProductUseCase {
  // definindo os atributos
  private productRepository: ProductRepositoryInterface;

  // definindo o construtor com os atributos mínimos necessários
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  // definindo o método de execução do usecase
  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    // consultando no db, a partir dos dados do inputDto, utilizando os métodos do repository
    const product = await this.productRepository.find(input.id);

    // retornando os dados no formato do outputDto
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
