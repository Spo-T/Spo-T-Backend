import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { UserModule } from './infrastructure/global/module/user.module';
import { AuthModule } from './infrastructure/global/module/auth.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {
}
