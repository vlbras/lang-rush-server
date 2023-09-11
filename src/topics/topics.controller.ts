import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { IsUserFolder } from 'src/core/decorators/is-user-folder.decorator';

@IsUserFolder()
@Controller()
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
  ) {}

  @Post('folders/:folderId/topics')
  async create(
    @Param('folderId') folderId: string,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return this.topicsService.create(folderId, createTopicDto);
  }

  @Get('folders/:folderId/topics')
  async findAll(
    @Param('folderId') folderId: string,
  ) {
    return this.topicsService.findAll(folderId);
  }

  @Patch('/topics/:topicId')
  update(@Param('topicId') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete('/topics/:topicId')
  remove(@Param('topicId') id: string) {
    return this.topicsService.remove(id);
  }
}
