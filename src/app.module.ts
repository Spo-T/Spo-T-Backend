import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';

@Module({
    imports: [
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {
}
