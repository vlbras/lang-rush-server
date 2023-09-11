import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from './schemas/topic.schema';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel('Topic')
    private readonly topicModel: Model<Topic>,
  ) {}

  async create(folderId: string, createTopicDto: CreateTopicDto) {
    try {
      const topic = await this.topicModel.create({
        ...createTopicDto,
        folder: folderId,
      });
      await topic.save();
      return topic;
    } 
    catch (error) {
      throw new ConflictException('Topic already exists');
    }
  }

  findAll(folderId: string) {
    return this.topicModel.find({ folder: folderId });
  }

  async findOne(id: string) {
    const topic = await this.topicModel.findById(id);
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    try {
      const topic = await this.findOne(id);
      topic.name = updateTopicDto.name;
      await topic.save();
      return topic;
    }
    catch (error) {
      throw new ConflictException('Topic already exists');
    }
  }

  async remove(id: string) {
    const topic = await this.findOne(id);
    await topic.deleteOne();
  }
}
