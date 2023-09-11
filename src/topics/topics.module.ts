import { Module, forwardRef } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from './schemas/topic.schema';
import { FoldersModule } from 'src/folders/folders.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Topic.name,
        schema: TopicSchema,
      },
    ]),
    forwardRef(() => FoldersModule),
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
