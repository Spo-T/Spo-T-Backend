import { UserEntity } from '../../../../infrastructure/domain/user/persistence/user.entity';
import { User } from '../domain/user';

export interface UserPort {
    queryUserByEmail(email: string): Promise<UserEntity | null>;

    saveUser(user: User): Promise<User>;
}

export const UserPort = Symbol('IUserPort');