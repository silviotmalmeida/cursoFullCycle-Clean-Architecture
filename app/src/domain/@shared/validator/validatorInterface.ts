// interface para os validators das entidades
export default interface ValidatorInterface<T> {
  validate(entity: T): void;
}
