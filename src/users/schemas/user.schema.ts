import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../core/enums/roles.enum';

@Schema()
export class User {
  @Prop({ require: true, unique: true, index: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ require: true, enum: Role, default: Role.CUSTOMER })
  role?: Role;

  @Prop({ require: false, index: true })
  token?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
