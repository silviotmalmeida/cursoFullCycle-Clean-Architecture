// definindo o input a ser recebido no usecase
export interface InputListProductDto {}

// definindo o padrão do objeto a ser retornado no array do output
type Product = {
  id: string;
  name: string;
  price: number;
};

// definindo o output a ser enviado no usecase
export interface OutputListProductDto {
  products: Product[];
}
