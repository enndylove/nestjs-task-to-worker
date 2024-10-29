import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('start')
    async createUser() {
        return this.userService.createUser();
    }

    @Get(':id/progress')
    async getUserProgress(@Param('id') id: number) {
        return this.userService.getUserProgress(id);
    }

    @Post(':id/earn')
    async updateXp(@Param('id') id: number) {
        return this.userService.updateXp(id);
    }
}
