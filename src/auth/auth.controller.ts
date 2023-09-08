import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Tokens } from 'src/core/interfaces/tokens.interface';
import { UserId } from 'src/core/decorators/user-id.decorator';
import { Public } from 'src/core/decorators/public.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { RefreshTokenGuard } from 'src/core/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }

  @Post('log-out')
  logOut(@UserId() userId: string) {
    return this.authService.logOut(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-tokens')
  refreshTokens(
    @UserId() userId: string,
    @User('refreshToken') refreshToken: string): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
