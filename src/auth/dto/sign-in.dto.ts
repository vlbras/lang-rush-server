import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsString()
  @Length(8, 20)
  readonly password: string;
}
