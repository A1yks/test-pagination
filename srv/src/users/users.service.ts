import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UsersPaginationDto } from './users.pagination.dto';

@Injectable()
export class UserService {
  private readonly DEFAULT_LIMIT = 20;

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  async find({ page = 1 }: UsersPaginationDto) {
    const offset = (page - 1) * this.DEFAULT_LIMIT;

    const [users, count] = await Promise.all([
      this.usersRepo.find({
        take: this.DEFAULT_LIMIT,
        skip: offset,
      }),
      this.usersRepo.count(),
    ]);

    const pageCount = Math.ceil(count / this.DEFAULT_LIMIT);

    return { users, pageCount };
  }
}
