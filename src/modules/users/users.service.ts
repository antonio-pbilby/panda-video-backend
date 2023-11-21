import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';

import { config } from '@/config';
import { IDENTIFIERS } from '@/container';
import { AuthenticationError } from '@/errors/authentication.error';

import { User } from './ users.namespace';

@injectable()
export class UsersService implements User.ServiceInterface {
  constructor(
    @inject(IDENTIFIERS.USERS_REPOSITORY)
    private readonly usersRepository: User.RepositoryInterface,
  ) {}

  async create(user: User.Create): Promise<User.Entity> {
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    return this.usersRepository.create({
      ...user,
      password: encryptedPassword,
    });
  }

  async login(credentials: User.Login): Promise<{ token: string }> {
    const user = await this.usersRepository.findByEmail(credentials.email);

    if (!user) {
      throw new AuthenticationError('Email or passsword incorrect.');
    }

    const passwordsMatch = await bcrypt.compare(
      credentials.password,
      user.password!,
    );

    if (!passwordsMatch) {
      throw new AuthenticationError('Email or passsword incorrect.');
    }

    const token = sign({}, config.appSecret, {
      subject: user.email,
      expiresIn: config.tokenExpiresIn,
    });

    return {
      token,
    };
  }
}
