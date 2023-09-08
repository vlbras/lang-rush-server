import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from '../core/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Tokens } from 'src/core/interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Tokens> {
    const { _id, role } = await this.usersService.create(signUpDto);
    const id = _id.toString();
    const { accessToken, refreshToken } = await this.generateTokens({ id, role });

    return { accessToken, refreshToken };
  }

  async signIn(signInDto: SignInDto): Promise<Tokens> {
    const { _id, role, password } = await this.usersService.findOneByEmail(
      signInDto.email,
    );
    const id = _id.toString();
    const isPasswordValid = await verify(password, signInDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const { accessToken, refreshToken } = await this.generateTokens({ id, role });

    return { accessToken, refreshToken };
  }

  logOut(userId: string): void {
    this.usersService.update(userId, { token: null });
  }

  async refreshTokens(userId: string, token: string): Promise<Tokens> {
    const { token: hashedRefreshToken, role } =
      await this.usersService.findOne(userId);

    if (!hashedRefreshToken) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const isRefreshTokenValid = await verify(hashedRefreshToken, token);

    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const { accessToken, refreshToken } = await this.generateTokens({ id: userId, role });
    
    return { accessToken, refreshToken };
  }

  private async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(payload, process.env.JWT_ACCESS_TTL),
      this.signToken(payload, process.env.JWT_REFRESH_TTL),
    ]);
    const hashedRefreshToken = await hash(refreshToken);
    await this.usersService.update(payload.id, { token: hashedRefreshToken });

    return { accessToken, refreshToken };
  }

  private async signToken(payload: JwtPayload, expiresIn: string) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      expiresIn,
    });
  }
}
