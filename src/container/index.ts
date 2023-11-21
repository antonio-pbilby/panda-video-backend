import { Container } from 'inversify';

export const IDENTIFIERS = {
  USERS_COLLECTION: Symbol.for('USERS_COLLECTION'),
  USERS_SERVICE: Symbol.for('USERS_SERVICE'),
  USERS_REPOSITORY: Symbol.for('USERS_REPOSITORY'),
};

export const container = new Container();
