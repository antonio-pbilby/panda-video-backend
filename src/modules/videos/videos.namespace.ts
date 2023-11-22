import * as yup from 'yup';

export namespace Videos {
  export interface ListParams {
    page?: number;
  }

  export const listParamsSchema = yup.object({
    query: yup.object({
      page: yup.number().integer(),
    }),
  });
}