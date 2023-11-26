import * as yup from 'yup';

export namespace User {
  export class Entity {
    id?: string;
    name: string;
    email: string;
    password?: string;
  }

  export interface RepositoryInterface {
    create(user: Create): Promise<Entity>;
    findByEmail(email: string): Promise<Entity | null>;
  }

  export interface ServiceInterface {
    create(user: Create): Promise<Entity>;
    login(credentials: Login): Promise<{ token: string }>;
  }

  export interface Create {
    name: string;
    email: string;
    password: string;
  }

  export interface Login {
    email: string;
    password: string;
  }

  export interface LoginResponse {
    token: string;
  }

  export const signupSchema = yup.object({
    body: yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });

  export const loginSchema = yup.object({
    body: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });
}
