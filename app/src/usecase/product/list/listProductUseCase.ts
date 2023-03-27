// dependências
import ProductInterface from "../../../domain/product/entity/productInterface";
import ProductRepositoryInterface from "../../../domain/product/repository/productRepositoryInterface";
import { InputListProductDto, OutputListProductDto } from "./listProductDto";

// usecase de criação a partir do inputDto, retornando o outputDto
export default class ListProductUseCase {
  // definindo os atributos
  private productRepository: ProductRepositoryInterface;

  // definindo o construtor com os atributos mínimos necessários
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.productRepository = ProductRepository;
  }

  // definindo o método de execução do usecase
  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    // consultando no db, utilizando os métodos do repository
    const products = await this.productRepository.findAll();

    // retornando os dados no formato do outputDto
    return OutputMapper.toOutput(products);
  }
}

// classe auxiliar para formatar os dados conforme o outputDto
class OutputMapper {
  static toOutput(product: ProductInterface[]): OutputListProductDto {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
