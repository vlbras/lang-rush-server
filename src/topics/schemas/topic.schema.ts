import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Langs } from 'src/core/enums/langs.enum';
import { Folder } from 'src/folders/schemas/folder.schema';

@Schema({})
export class Topic {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true, enum: Langs })
  langFrom: Langs;

  @Prop({ require: true, enum: Langs })
  langTo: Langs;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Folder.name,
    require: true,
  })
  folder: Folder;
}

const TopicSchema = SchemaFactory.createForClass(Topic);

TopicSchema.index({ name: 1, folder: 1 }, { unique: true });

export { TopicSchema };