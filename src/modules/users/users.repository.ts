import { inject, injectable } from 'inversify';
import { Collection } from 'mongodb';

import { IDENTIFIERS } from '@/container';

import { User } from './ users.namespace';

@injectable()
export class UsersRepository implements User.RepositoryInterface {
  constructor(
    @inject(IDENTIFIERS.USERS_COLLECTION)
    private readonly users: Collection<User.Entity>,
  ) {}

  async create(user: User.Create): Promise<User.Entity> {
    const { insertedId } = await this.users.insertOne({
      ...user,
    });

    return {
      id: insertedId.toString(),
      email: user.email,
      name: user.name,
    };
  }

  async findByEmail(email: string): Promise<User.Entity | null> {
    const user = await this.users.findOne({
      email,
    });

    return user;
  }
}
