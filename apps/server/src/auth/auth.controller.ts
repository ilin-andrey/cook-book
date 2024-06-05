import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { Response, type CookieOptions } from "express";

import { JoiValidationPipe } from "~/pipes/validation.pipe";

import { AuthService } from "./auth.service";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./consts";
import { Public } from "./decorators/public.decorator";
import { LoginSchema } from "./dto/login.dto";
import { RegisterDto, RegisterSchema } from "./dto/register.dto";
import { RefreshTokenGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RequestWithUser } from "./interfaces/request.interface";

const COOKIES_SETTINGS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
};

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @UsePipes(new JoiValidationPipe(RegisterSchema))
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const tokens = await this.authService.register(registerDto);

    return this.storeTokensInCookies(res, tokens).sendStatus(
      HttpStatus.CREATED,
    );
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    if (!req.user) {
      throw new BadRequestException();
    }

    const { userId, email } = req.user;
    const tokens = await this.authService.login(userId, email);

    return this.storeTokensInCookies(res, tokens).sendStatus(HttpStatus.OK);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("logout")
  logout(@Req() req: RequestWithUser, @Res() res: Response) {
    const { userId, refreshToken } = req.user;
    const result = this.authService.logout(userId, refreshToken as string);

    if (!result) {
      throw new InternalServerErrorException();
    }

    return this.clearTokensFromCookies(res).sendStatus(HttpStatus.OK);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  async refresh(@Req() req: RequestWithUser, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const { userId, refreshToken } = req.user;

    try {
      const accessToken = await this.authService.refreshAccessToken(
        userId,
        refreshToken as string,
      );

      return this.storeAccessTokenInCookies(res, accessToken).sendStatus(
        HttpStatus.OK,
      );
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        return this.clearTokensFromCookies(res).sendStatus(
          HttpStatus.UNAUTHORIZED,
        );
      }

      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  storeAccessTokenInCookies(res: Response, accessToken: string) {
    return res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      ...COOKIES_SETTINGS,
      maxAge: this.authService.getAccessTokenExpTime() * 1000,
    });
  }

  storeTokensInCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    this.storeAccessTokenInCookies(res, tokens.accessToken);
    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
      ...COOKIES_SETTINGS,
      maxAge: this.authService.getRefreshTokenExpTime() * 1000,
    });

    return res;
  }

  clearTokensFromCookies(res: Response) {
    return res
      .cookie(ACCESS_TOKEN_COOKIE, "", { maxAge: 0 })
      .cookie(REFRESH_TOKEN_COOKIE, "", { maxAge: 0 });
  }
}
