import { UserService } from './users.service';
import { Controller, Get, Logger, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';
import { UsersPaginationDto } from './users.pagination.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getUsers(@Query() paginationDto: UsersPaginationDto) {
    this.logger.log('Get users');
    const { users, pageCount } = await this.userService.find(paginationDto);

    return {
      users: users.map((user) => UsersResponseDto.fromUsersEntity(user)),
      pageCount,
    };
  }
}
