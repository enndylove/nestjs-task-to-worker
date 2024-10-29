import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser (userId: number): Promise<any> {
        const user = await this.userService.getUserProgress(userId);
        if (user) {
            return user;
        }
        return null;
    }

    async login(userId: number) {
        const payload = { userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}