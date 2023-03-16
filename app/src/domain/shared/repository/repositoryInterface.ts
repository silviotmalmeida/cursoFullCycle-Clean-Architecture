// interface a ser implementada pelos repositories
export default interface RepositoryInterface<T> {
  // métodos obrigatórios
  create(entity: T): Promise<void>; // criação
  update(entity: T): Promise<void>; // atualização
  find(id: string): Promise<T>; // busca por id
  findAll(): Promise<T[]>; // busca
}
