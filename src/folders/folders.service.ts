import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './schemas/folder.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder.name)
    private readonly folderModel: Model<Folder>,
  ) {}

  async create(userId: string, createFolderDto: CreateFolderDto) {
    try {
      const folder = await this.folderModel.create({
        ...createFolderDto,
        user: userId,
      });
      await folder.save();
      return this.findOne(folder._id.toString());
    } 
    catch (error) {
      throw new ConflictException('Folder already exists');
    }
  }

  async findAll(userId: string) {
    return this.folderModel.find({ user: userId }).select('-user');
  }

  async findOne(id: string, userId?: string) {
    const query: any = { _id: id };
    if (userId) {
      query.user = userId;
    }
    const folder = await this.folderModel.findOne(query).select('-user');
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }
    return folder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto) {
    try {
      const folder = await this.findOne(id);
      folder.name = updateFolderDto.name;
      await folder.save();
      return folder;
    }
    catch (error) {
      throw new ConflictException('Folder already exists');
    }
  }

  async remove(id: string) {
    const folder = await this.findOne(id);
    return folder.deleteOne();
  }
}
