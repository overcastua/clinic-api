export interface IWSEvent<T extends Record<string, any>> {
  emit(data: T): void;
}
