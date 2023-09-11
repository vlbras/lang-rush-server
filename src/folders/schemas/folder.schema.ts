import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Folder {
  @Prop({ require: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;
}

const FolderSchema = SchemaFactory.createForClass(Folder);

FolderSchema.index({ name: 1, user: 1 }, { unique: true });

export { FolderSchema}
