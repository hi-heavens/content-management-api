import { DataSource, DataSourceOptions } from 'typeorm';
import { Post } from '../src/post/entity/post.entity';
import { User } from '../src/user/entity/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: 'postgres://content_management_user:ULXZdoyyLt6Ei5Scicq0SotVLaLm0iUy@dpg-cgi3nbg2qv2772he7p4g-a.oregon-postgres.render.com/content_management',
  entities: [User, Post],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
  // synchronize: true,
  // Uncomment the following line to connect to a local database.
  /*type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'root',
  password: 'Urpapa@12',
  database: 'contentmanagement',
  entities: [User, Post],
  // synchronize: true,
  migrations: ['dist/db/migrations/*{.ts,.js}'],*/
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
