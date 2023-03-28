import { ParseUUIDPipe } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  userId: ParseUUIDPipe;

  user?: User;
}
