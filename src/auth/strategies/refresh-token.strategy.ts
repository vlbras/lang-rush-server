import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { JwtPayload, JwtPayloadWithRefreshToken } from "src/core/interfaces/jwt-payload.interface";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token'){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    const refreshToken = req?.get('authorization')?.split(' ')[1];

    return { ...payload, refreshToken };
  }
}