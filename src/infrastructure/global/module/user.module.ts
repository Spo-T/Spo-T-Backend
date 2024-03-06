import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/persistence/user.entity';
import { Global, Module } from '@nestjs/common';
import { UserPort } from '../../../application/domain/user/spi/user.spi';
import { UserPersistenceAdapter } from '../../domain/user/persistence/user.persistence';
import { UserMapper } from '../../domain/user/persistence/user.mapper';

const USER_REPOSITORY = TypeOrmModule.forFeature([UserEntity]);
const USER_PORT = { provide: UserPort, useClass: UserPersistenceAdapter };

@Global()
@Module({
    imports: [USER_REPOSITORY],
    controllers: [],
    providers: [USER_PORT, UserMapper],
    exports: [USER_REPOSITORY, USER_PORT, UserMapper]
})
export class UserModule {
}