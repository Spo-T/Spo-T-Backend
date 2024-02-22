import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPort } from '../../../application/domain/auth/spi/auth.spi';
import { TokenResponse } from '../../../application/domain/auth/dto/auth.dto';

@Injectable()
export class JwtAdapter implements JwtPort {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    async generateToken(userId: string): Promise<TokenResponse> {
        const accessToken = await this.signJwtToken(userId, '1h', 'access');

        return {
            accessToken,
        };
    }

    private async signJwtToken(userId: string, exp: string, typ: string) {
        return await this.jwtService.signAsync(
            { sub: userId, typ },
            { expiresIn: exp }
        );
    }
}