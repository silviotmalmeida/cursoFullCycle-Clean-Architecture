// dependências
import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/productRepositoryInterface";
import ProductModel from "./productModel";

// classe de repositório do orm, implementando a interface de repositório definida no domain
export default class ProductRepository implements ProductRepositoryInterface {
  // método de criação
  async create(entity: Product): Promise<void> {
    // utiliza o método default do orm
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  // método de atualização
  async update(entity: Product): Promise<void> {
    // utiliza o método default do orm
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  // método de busca por id
  async find(id: string): Promise<Product> {
    // obtendo os dados do bd
    let productModel;
    // tratamento de exceções
    try {
      // utiliza o método default do orm
      productModel = await ProductModel.findOne({ where: { id: id }, });
    } catch (error) {
      // em caso de inexistência, lança uma exceção
      throw new Error("Product not found");
    }
    // recriando a entidade do agregado, a partir dos dados do bd
    return new Product(productModel.id, productModel.name, productModel.price);
  }

  // método de busca
  async findAll(): Promise<Product[]> {
    // utiliza o método default do orm
    const productModels = await ProductModel.findAll();

    //iterando sobre os registros
    return productModels.map(
      // recriando as entidades do agregado, a partir dos dados do bd
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
