import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  async createUser(@Body() users: Users): Promise<Users> {
    return await this.usersService.create(users);
  }

  @Get('allUsers')
  async getAllUsers(): Promise<Users[]> {
    return await this.usersService.findAll();
  }
}
