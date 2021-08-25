import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Movie } from './entities/movie';
import { MovieCredit } from './entities/movie_credit';
import { MovieModule } from './movie/movie.module';

const databaseConfig: TypeOrmModuleOptions = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL,
      type: 'postgres',
      entities: [Movie, MovieCredit],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }
  : {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Movie, MovieCredit],
      synchronize: true,
      ssl: process.env.SSL ? true : false,
    };

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
