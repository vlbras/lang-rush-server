import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { UserId } from 'src/core/decorators/user-id.decorator';
import { IsUserFolder } from 'src/core/decorators/is-user-folder.decorator';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@UserId() userId: string, @Body() createFolderDto: CreateFolderDto) {
    return this.foldersService.create(userId, createFolderDto);
  }

  @Get()
  async findAll(@UserId() userId: string) {
    return this.foldersService.findAll(userId);
  }

  @IsUserFolder()
  @Patch(':folderId')
  update(
    @Param('folderId') id: string,
    @Body() updateFolderDto: UpdateFolderDto,
  ) {
    return this.foldersService.update(id, updateFolderDto);
  }

  @IsUserFolder()
  @Delete(':folderId')
  remove(@Param('folderId') id: string) {
    return this.foldersService.remove(id);
  }
}
