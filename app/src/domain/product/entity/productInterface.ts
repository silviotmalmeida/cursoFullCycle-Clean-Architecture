// interface a ser implementada pelos products
export default interface ProductInterface {

  // atributos obrigatórios
  get id(): string;
  get name(): string;
  get price(): number;
}