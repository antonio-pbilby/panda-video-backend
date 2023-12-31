import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';

import { IDENTIFIERS } from '@/container';
import { AuthenticationError } from '@/errors/authentication.error';
import { BadRequestError } from '@/errors/bad-request.error';

import { Token } from '../tokens/token.namespace';
import { User } from './ users.namespace';

@injectable()
export class UsersService implements User.ServiceInterface {
  constructor(
    @inject(IDENTIFIERS.USERS_REPOSITORY)
    private readonly usersRepository: User.RepositoryInterface,
    @inject(IDENTIFIERS.TOKEN_PROVIDER)
    private readonly tokenProvider: Token.ProviderInterface,
  ) {}

  async create(user: User.Create): Promise<User.Entity> {
    const encryptedPassword = await bcrypt.hash(user.password, 10);

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      throw new BadRequestError('User already exists');
    }

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

    const token = this.tokenProvider.sign({
      email: user.email,
      name: user.name,
    });

    return {
      token,
    };
  }
}
