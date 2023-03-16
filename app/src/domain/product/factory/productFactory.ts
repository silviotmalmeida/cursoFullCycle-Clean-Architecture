// dependências
import Product from "../entity/product";
import ProductB from "../entity/productB";
import ProductInterface from "../entity/productInterface";

// definindo os atributos mínimos a serem passados para a factory
interface ProductFactoryProps {
  id: string;
  name: string;
  price: number;
  type: string;
}

// factory para o agregado de checkout
export default class ProductFactory {
  public static create(props: ProductFactoryProps): ProductInterface {
    switch (props.type) {
      case "a":
        return new Product(props.id, props.name, props.price);
      case "b":
        return new ProductB(props.id, props.name, props.price);
      // se precisar de mais categorias de produtos pode-se adicionar em outos cases
      default:
        throw new Error("Product type not supported");
    }
  }
}
