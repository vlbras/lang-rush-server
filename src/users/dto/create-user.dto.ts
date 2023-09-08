import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '../../core/enums/roles.enum';
import { Transform, Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsString()
  @Length(8, 20)
  readonly password: string;

  @IsOptional()
  @IsEnum(Role)
  @Type(() => String)
  readonly role?: Role;
}
