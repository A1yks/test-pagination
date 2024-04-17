import { Min, IsInt, IsOptional } from 'class-validator';

export class UsersPaginationDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;
}
