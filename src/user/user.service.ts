import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    private readonly xpPerMinute = 5;

    constructor(private prisma: PrismaService) {}

    async createUser(): Promise<User> {
        return this.prisma.user.create({
            data: {},
        });
    }

    async getUserProgress(userId: number): Promise<User> {
        const id = Number(userId);
        if (isNaN(id)) {
            throw new Error('Invalid user ID');
        }

        return this.prisma.user.findUnique({
            where: { id },
        });
    }


    async updateXp(userId: number): Promise<User> {
        const id = Number(userId);

        if (isNaN(id)) {
            throw new Error('Invalid user ID');
        }

        const user = await this.prisma.user.findUnique({ where: { id: id } });
        const currentTime = new Date();
        const minutesElapsed = Math.floor(
            (currentTime.getTime() - user.lastLogin.getTime()) / 60000,
        );

        const additionalXp = BigInt(minutesElapsed * this.xpPerMinute);

        let newXp = Number(user.xp) + Number(additionalXp);
        let newLevel = user.level;

        const levels = await this.prisma.level.findMany({
            where: { level: { gte: newLevel } },
            orderBy: { level: 'asc' },
        });

        for (const level of levels) {
            if (newXp >= level.xpThreshold) {
                newLevel = level.level;
            } else {
                break;
            }
        }

        return this.prisma.user.update({
            where: { id: id },
            data: {
                xp: newXp,
                level: newLevel,
                lastLogin: currentTime,
            },
        });
    }
}