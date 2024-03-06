import { Injectable } from '@nestjs/common';
import { UserPort } from '../../../../application/domain/user/spi/user.spi';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';
import { User } from '../../../../application/domain/user/domain/user';

@Injectable()
export class UserPersistenceAdapter implements UserPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userMapper: UserMapper
    ) {
    }

    async queryUserByEmail(email: string): Promise<UserEntity> {
        return this.userMapper.toDomain(
            await this.userRepository.findOneBy({ email: email })
        );
    }

    async saveUser(user: User): Promise<User> {
        return this.userMapper.toDomain(
            await this.userRepository.save(this.userMapper.toEntity(user)));
    }
}