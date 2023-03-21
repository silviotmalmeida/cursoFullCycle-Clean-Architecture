// definindo o input a ser recebido no usecase
export interface InputListCustomerDto {}

// definindo o padrão do objeto a ser retornado no array do output
type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
};

// definindo o output a ser enviado no usecase
export interface OutputListCustomerDto {
  customers: Customer[];
}
