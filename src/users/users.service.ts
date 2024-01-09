import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(users: Users): Promise<Users> {
    // Check if email is provided
    if (!users.email) {
      throw new BadRequestException('Email is required');
    }
    // then we check if the user already exists or not
    const existingUser = await this.userRepository.findOne({
      where: { email: users.email },
    });
    if (existingUser) {
      throw new ConflictException('This Email is already exist');
    }

    // now save the user
    return await this.userRepository.save(users);
  }

  async findAll(): Promise<Users[]> {
    // Retrieve all the users from the users table
    const allUsers = await this.userRepository.find();

    // return all the users
    return allUsers;
  }
}
