import { IsString } from 'class-validator';

export class resetPasswordDto {
  @IsString()
  password: string;
}
