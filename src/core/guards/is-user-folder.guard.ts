import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FoldersService } from 'src/folders/folders.service';
import { TopicsService } from 'src/topics/topics.service';

@Injectable()
export class IsUserFolderGuard implements CanActivate {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly topicService: TopicsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id: userId, role} = request.user

    if (role === 'admin') {
      return true;
    }

    const folderId = request.params.folderId;
    if (folderId) {
      await this.foldersService.findOne(folderId, userId); // trows error if user doesn't own the folder
      return true;
    }

    const topicId = request.params.topicId;
    const topic = await this.topicService.findOne(topicId); // trows error if topic doesn't exist
    await this.foldersService.findOne(topic.folder.toString(), userId); // trows error if user doesn't own the folder

    return true;
  }
}
