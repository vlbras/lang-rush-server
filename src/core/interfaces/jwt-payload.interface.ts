import { Role } from '../enums/roles.enum';

export interface JwtPayload {
  id: string;
  role: Role;
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refreshToken: string;
}