import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '../../../../application/domain/user/domain/user';

@Injectable()
export class UserMapper {
    toDomain(entity: UserEntity): User | null {
        return entity ? new User(
            entity.id,
            entity.password,
            entity.password,
            entity.profile
        ) : null;
    }

    toEntity(domain: User): UserEntity {
        return new UserEntity(
            domain.id,
            domain.email,
            domain.password,
            domain.profile
        );
    }
}