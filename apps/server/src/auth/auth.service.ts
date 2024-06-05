import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "~/resources/users/users.service";

import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUser({ email });
    if (!user) {
      throw new BadRequestException("User does not exist");
    }

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      throw new BadRequestException("Password is incorrect");
    }

    return { id: user.id, email: user.email };
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const sessions = await this.usersService.findUserSessions({ userId });

    const matched = sessions.find((i) =>
      bcrypt.compareSync(refreshToken, i.refreshTokenHash),
    );

    if (matched) {
      return matched;
    }
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findUser({ email: registerDto.email });
    if (user) {
      throw new BadRequestException("User already exists");
    }

    const hashed = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.usersService.createUser({
      ...registerDto,
      password: hashed,
    });

    if (!newUser) {
      throw new InternalServerErrorException();
    }

    const tokens = await this.getJwtTokens(newUser.id, newUser.email);
    const session = await this.createSession(newUser.id, tokens.refreshToken);

    if (!session) {
      throw new InternalServerErrorException();
    }

    return tokens;
  }

  async login(userId: number, email: string) {
    const tokens = await this.getJwtTokens(userId, email);
    await this.createSession(userId, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number, refreshToken: string) {
    const sessions = await this.usersService.findUserSessions({ userId });

    const matched = sessions.find((i) =>
      bcrypt.compareSync(refreshToken, i.refreshTokenHash),
    );

    if (matched) {
      await this.usersService.removeSession({ id: matched.id });
      return true;
    }

    return false;
  }

  async refreshAccessToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findUser({ id: userId });
    const sessions = await this.usersService.findUserSessions({ userId });

    const matched = sessions.find((i) =>
      bcrypt.compareSync(refreshToken, i.refreshTokenHash),
    );

    if (!user || !matched) {
      throw new UnauthorizedException("Access Denied");
    }

    if (matched.expiredAt < new Date()) {
      await this.usersService.removeSession({ id: matched.id });
      throw new UnauthorizedException("Access Denied");
    }

    return await this.getAccessToken(user.id, user.email);
  }

  async createSession(userId: number, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);

    return await this.usersService.createSession({
      userId,
      refreshToken: hashed,
      expiredAt: new Date(Date.now() + this.getRefreshTokenExpTime() * 1000),
    });
  }

  private async getJwtToken(
    userId: number,
    email: string,
    secret?: string,
    exp?: string,
  ) {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret,
        expiresIn: exp,
      },
    );

    return token;
  }

  getAccessTokenExpTime() {
    return (
      this.configService.get<number>("JWT_ACCESS_TOKEN_EXPIRATION_TIME") ?? 1
    );
  }

  getRefreshTokenExpTime() {
    return (
      this.configService.get<number>("JWT_REFRESH_TOKEN_EXPIRATION_TIME") ?? 1
    );
  }

  async getAccessToken(userId: number, email: string) {
    return await this.getJwtToken(
      userId,
      email,
      this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
      `${this.getAccessTokenExpTime()}s`,
    );
  }

  async getJwtTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(userId, email),
      this.getJwtToken(
        userId,
        email,
        this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
        `${this.getRefreshTokenExpTime()}s`,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
