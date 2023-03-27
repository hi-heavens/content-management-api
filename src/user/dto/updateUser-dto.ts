import { IsString } from 'class-validator';

export class updateDto {
  @IsString()
  readonly first_name?: string;

  @IsString()
  readonly last_name?: string;
}
