import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { REFRESH_TOKEN_COOKIE } from "~/auth/consts";
import { TokenPayload } from "~/auth/interfaces/token.interface";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
      ]),
      secretOrKey: configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && REFRESH_TOKEN_COOKIE in req.cookies) {
      return req.cookies[REFRESH_TOKEN_COOKIE];
    }

    return null;
  }

  async validate(req: Request, payload: TokenPayload) {
    const token = req.cookies[REFRESH_TOKEN_COOKIE];

    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken: token,
    };
  }
}
