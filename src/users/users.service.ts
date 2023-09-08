import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hash(createUserDto.password);
      const createUser = {
        ...createUserDto,
        password: hashedPassword,
      };
      const user = await this.userModel.create(createUser);
      return user.save();
    } 
    catch (error) {
      throw new ConflictException('User already exists');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        const hashedPassword = await hash(updateUserDto.password);
        updateUserDto = {
          ...updateUserDto,
          password: hashedPassword,
        };
      }
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } 
    catch (error) {
      throw new ConflictException('User already exists');
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.deleteOne();
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
