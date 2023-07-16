import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ACCESS_TOKEN_COOKIE } from "~/auth/consts";
import { TokenPayload } from "~/auth/interfaces/token.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
      ignoreExpiration: false,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && ACCESS_TOKEN_COOKIE in req.cookies) {
      return req.cookies[ACCESS_TOKEN_COOKIE];
    }

    return null;
  }

  async validate(payload: TokenPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
