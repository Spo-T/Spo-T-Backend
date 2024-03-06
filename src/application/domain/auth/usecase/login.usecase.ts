import { Inject, Injectable } from '@nestjs/common';
import { UserPort } from '../../user/spi/user.spi';
import { User } from '../../user/domain/user';
import { TokenResponse } from '../dto/auth.dto';
import { JwtPort } from '../spi/auth.spi';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort,
        private config: ConfigService
    ) {
    }

    async googleLogin(req): Promise<TokenResponse> {
        let user = await this.userPort.queryUserByEmail(req.user.email);

        if (!user) {
            user = await this.userPort.saveUser(
                new User(
                    req.id,
                    req.user.email,
                    this.config.get('SECRET_PASSWORD'),
                    ''
                )
            );
        }
        return this.jwtPort.generateToken(user.id);
    }
}