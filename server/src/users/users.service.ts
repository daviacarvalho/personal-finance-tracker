import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    const users = await this.prisma.user.findMany();
    if (!users || users.length == 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });

      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Impossible to create the user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
