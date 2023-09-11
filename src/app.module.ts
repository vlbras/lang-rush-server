import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './core/guards/access-token.guard';
import { FoldersModule } from './folders/folders.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    FoldersModule,
    TopicsModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
