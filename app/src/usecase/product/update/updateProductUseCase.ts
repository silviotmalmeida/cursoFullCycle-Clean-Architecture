// dependências
import ProductRepositoryInterface from "../../../domain/product/repository/productRepositoryInterface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./updateProductDto";

// usecase de criação a partir do inputDto, retornando o outputDto
export default class UpdateProductUseCase {
  // definindo os atributos
  private ProductRepository: ProductRepositoryInterface;

  // definindo o construtor com os atributos mínimos necessários
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  // definindo o método de execução do usecase
  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    // consultando no db, a partir dos dados do inputDto, utilizando os métodos do repository
    const product = await this.ProductRepository.find(input.id);

    // aplicando as alterações a partir dos daddos do inputDto
    product.changeName(input.name);
    product.changePrice(input.price);

    // atualizando o db, utilizando os métodos do repository
    await this.ProductRepository.update(product);

    // retornando os dados no formato do outputDto
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
