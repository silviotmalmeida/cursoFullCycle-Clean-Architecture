// interface a ser implementada pelos products
export default interface ProductInterface {

  // atributos obrigatórios
  get id(): string;
  get name(): string;
  get price(): number;

  //métodos obrigatórios
  changeName(name: string): void;
  changePrice(price: number): void;
}