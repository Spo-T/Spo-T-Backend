import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '../../../../application/domain/auth/usecase/login.usecase';
import { AuthGuard } from '@nestjs/passport';
import { TokenResponse } from '../../../../application/domain/auth/dto/auth.dto';

@Controller('auth')
export class AuthWebAdapter {
    constructor(
        private readonly loginUseCase: LoginUseCase
    ) {
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req): Promise<TokenResponse> {
        return this.loginUseCase.googleLogin(req);
    }
}