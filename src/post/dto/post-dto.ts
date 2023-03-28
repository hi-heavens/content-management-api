import { ParseUUIDPipe } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  userId: ParseUUIDPipe;
}
