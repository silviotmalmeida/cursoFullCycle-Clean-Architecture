// dependências
import Product from "../entity/product";

// service de domínio
export default class ProductService {

  // método para atualizar o price de uma lista de produtos, baseando-se em um valor percentual de aumento(+) ou desconto(-)
  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
    return products;
  }
}
