import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [UsersModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
