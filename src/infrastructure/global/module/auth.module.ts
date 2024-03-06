import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { GoogleStrategy } from '../oauth/google.strategy';
import { LoginUseCase } from '../../../application/domain/auth/usecase/login.usecase';
import { AuthWebAdapter } from '../../domain/auth/presentation/auth.web.adapter';
import { JwtPort } from '../../../application/domain/auth/spi/auth.spi';
import { JwtAdapter } from '../jwt/jwt.adapter';

const JWT_PORT = { provide: JwtPort, useClass: JwtAdapter };

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET')
            })
        }),
        PassportModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                defaultStrategy: 'jwt'
            })
        })
    ],
    controllers: [AuthWebAdapter],
    providers: [JwtStrategy, GoogleStrategy, JWT_PORT, LoginUseCase],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {
}