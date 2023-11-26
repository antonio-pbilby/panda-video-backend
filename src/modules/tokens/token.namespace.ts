export namespace Token {
  export interface ProviderInterface {
    sign(payload: Record<string, any>): string;
    verify<T>(token: string): T;
  }
}
