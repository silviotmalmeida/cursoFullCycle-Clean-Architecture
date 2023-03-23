// dependências
import ProductFactory from "../../../domain/product/factory/productFactory";
import ProductRepositoryInterface from "../../../domain/product/repository/productRepositoryInterface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./createProductDto";

// usecase de criação a partir do inputDto, retornando o outputDto
export default class CreateProductUseCase {
  // definindo os atributos
  private productRepository: ProductRepositoryInterface;

  // definindo o construtor com os atributos mínimos necessários
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  // definindo o método de execução do usecase
  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    // definindo as props de entrada da factory
    const productProps = {
      name: input.name,
      price: input.price,
      type: input.type,
    };

    // criando os objetos do agregado através da factory
    const product = ProductFactory.create(productProps);

    // criando no db, utilizando os métodos do repository
    await this.productRepository.create(product);

    // retornando os dados no formato do outputDto
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
