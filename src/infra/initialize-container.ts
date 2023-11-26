import { IDENTIFIERS, container } from '@/container';
import { Token } from '@/modules/tokens/token.namespace';
import { TokenProvider } from '@/modules/tokens/token.provider';
import { User } from '@/modules/users/ users.namespace';
import { UsersRepository } from '@/modules/users/users.repository';
import { UsersService } from '@/modules/users/users.service';

export function initializeContainer() {
  container
    .bind<User.RepositoryInterface>(IDENTIFIERS.USERS_REPOSITORY)
    .to(UsersRepository)
    .inSingletonScope();
  container
    .bind<User.ServiceInterface>(IDENTIFIERS.USERS_SERVICE)
    .to(UsersService)
    .inSingletonScope();
  container
    .bind<Token.ProviderInterface>(IDENTIFIERS.TOKEN_PROVIDER)
    .to(TokenProvider)
    .inSingletonScope();
}
