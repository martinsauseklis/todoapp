import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '1000s'
                }
            })
        })
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule {}
