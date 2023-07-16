import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { Response } from "express";

import { JoiValidationPipe } from "~/pipes/validation.pipe";

import { AuthService } from "./auth.service";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./consts";
import { Public } from "./decorators/public.decorator";
import { LoginSchema } from "./dto/login.dto";
import { RegisterDto, RegisterSchema } from "./dto/register.dto";
import { RefreshTokenGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RequestWithUser } from "./interfaces/request.interface";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @UsePipes(new JoiValidationPipe(RegisterSchema))
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const tokens = await this.authService.register(registerDto);

    this.storeTokensInCookies(res, tokens);
    res.json({ status: "ok" });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    if (!req.user) {
      throw new BadRequestException();
    }

    const { userId, email } = req.user;
    const tokens = await this.authService.login(userId, email);

    this.storeTokensInCookies(res, tokens).json({ status: "ok" });
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("logout")
  logout(@Req() req: RequestWithUser, @Res() res: Response) {
    const { userId, refreshToken } = req.user;
    const result = this.authService.logout(userId, refreshToken as string);

    if (!result) {
      throw new InternalServerErrorException();
    }

    return this.clearTokensFromCookies(res).json({ status: "ok" });
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  async refresh(@Req() req: RequestWithUser, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const { userId, refreshToken } = req.user;
    const accessToken = await this.authService.refreshAccessToken(
      userId,
      refreshToken as string,
    );

    this.storeAccessTokenInCookies(res, accessToken).json({
      status: "ok",
    });
  }

  storeAccessTokenInCookies(res: Response, accessToken: string) {
    return res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      maxAge: this.authService.getAccessTokenExpTime() * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  storeTokensInCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    this.storeAccessTokenInCookies(res, tokens.accessToken);
    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
      maxAge: this.authService.getRefreshTokenExpTime() * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res;
  }

  clearTokensFromCookies(res: Response) {
    return res
      .cookie(ACCESS_TOKEN_COOKIE, "", { maxAge: 0 })
      .cookie(REFRESH_TOKEN_COOKIE, "", { maxAge: 0 });
  }
}
