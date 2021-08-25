import { getConnection } from 'typeorm';
import { Movie } from './entities/movie';
import * as Papa from 'papaparse';

import * as fs from 'fs';
import { MovieCredit } from './entities/movie_credit';
import { Logger } from '@nestjs/common';
export class InstallationTask {
  logger: Logger = new Logger('INSTALLATION');
  async createMovieDb() {
    const movies = await getConnection().getRepository(Movie).find();
    if (movies.length == 0) {
      try{
        const fileContent = fs.readFileSync(
          '/archive/tmdb_5000_movies.csv',
          'utf-8',
        );
        const csvContent: any = await InstallationTask.parseCSV(fileContent);
        for (let i = 0; i < csvContent.length; i += 100) {
          const rowsToBeInserted = csvContent.slice(i, i + 100).map((row) => {
            return {
              original_title: row.original_title,
              meta_data: row,
            };
          });
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Movie)
            .values(rowsToBeInserted)
            .execute();
        }
        this.logger.log("Successfully added sample movies.");
      }catch(err){
        this.logger.error("Error adding movies " + err);
      }
    }else{
      this.logger.log("Movies data present.");
    }
  }

  async createMovieCreditsDb() {
    const movies = await getConnection().getRepository(MovieCredit).find();
    if (movies.length == 0) {
      try{
        const fileContent = fs.readFileSync(
          '/archive/tmdb_5000_credits.csv',
          'utf-8',
        );
        const csvContent: any = await InstallationTask.parseCSV(fileContent);
        for (let i = 0; i < csvContent.length; i += 100) {
          const rowsToBeInserted = csvContent.slice(i, i + 100).map((row) => {
            return {
              title: row.title,
              movie_id: row.movie_id,
              cast: JSON.parse(row.cast),
              crew: JSON.parse(row.crew),
            };
          });
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into(MovieCredit)
            .values(rowsToBeInserted)
            .execute();
        }
        this.logger.log("Successfully added sample movie credits.");
      }catch(err){
        this.logger.error("Error adding movie credits" + err);
      }
    }else{
      this.logger.log("Movie credits data present.");
    }
  }

  static parseCSV(csvContent: string) {
    return new Promise((resolve) => {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (data) => {
          resolve(data.data);
        },
      });
    });
  }
}
