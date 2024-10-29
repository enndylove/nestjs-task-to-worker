import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../jwt.strategy';
import { UserModule } from '../user/user.module';
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'e06a697730be91dd658af75a2d922b6ccf2fb4596a8329e30479925cb50a76be',
            signOptions: { expiresIn: '60s' },
        }),
        AuthModule,
        UserModule,
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}