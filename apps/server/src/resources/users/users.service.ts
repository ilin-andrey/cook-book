import { Injectable } from "@nestjs/common";
import { Prisma, Session, User } from "@prisma/client";

import { PrismaService } from "~/prisma.service";

import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: payload });
  }

  async findUserSessions(where: Prisma.SessionWhereInput): Promise<Session[]> {
    return this.prisma.session.findMany({ where });
  }

  async createSession(payload: {
    userId: number;
    refreshToken: string;
    expiredAt: Date;
  }) {
    return this.prisma.session.create({
      data: {
        userId: payload.userId,
        refreshTokenHash: payload.refreshToken,
        expiredAt: payload.expiredAt,
      },
    });
  }

  async removeSession(where: Prisma.SessionWhereUniqueInput) {
    return this.prisma.session.delete({ where });
  }
}
