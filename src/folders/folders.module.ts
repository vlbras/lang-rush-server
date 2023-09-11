import { Module, forwardRef } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { TopicsModule } from 'src/topics/topics.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Folder.name,
        schema: FolderSchema,
      },
    ]),
    forwardRef(() => TopicsModule),
  ],
  controllers: [FoldersController],
  providers: [FoldersService],
  exports: [FoldersService],
})
export class FoldersModule {}
