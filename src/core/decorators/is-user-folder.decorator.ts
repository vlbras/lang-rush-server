import { UseGuards, applyDecorators } from "@nestjs/common";
import { IsUserFolderGuard } from "../guards/is-user-folder.guard";

export const IsUserFolder = () => applyDecorators(UseGuards(IsUserFolderGuard));